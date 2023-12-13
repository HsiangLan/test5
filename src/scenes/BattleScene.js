import { Camera } from '../engine/Camera.js';
import { Ryu, Ken } from '../entities/fighters/index.js';
import { KenStage } from '../entities/stage/KenStage.js';
import { FpsCounter } from '../entities/overlays/FpsCounter.js'
import { StatusBar } from '../entities/overlays/StatusBar.js'
import { STAGE_MID_POINT, STAGE_PADDING } from '../constants/stage.js';
import { gameState } from '../state/gameState.js';
import { FIGHTER_HURT_DELAY, FighterAttackBaseData, FighterAttackStrength, FighterId } from '../constants/fighter.js';
import { LightHitSplash, MediumHitSplash, HeavyHitSplash, Shadow } from '../entities/fighters/shared/index.js';
import { FRAME_TIME } from '../constants/game.js';


export class BattleScene {
    fighters = [];
    camera = undefined;
    shadows = [];
    entities = [];
    hurtTimer = undefined;
    fighterDrawOrder = [ 0, 1 ];


    constructor() {
        this.stage = new KenStage();

        this.overlays = [
            new StatusBar(this.fighters),
            new FpsCounter(),
        ];

        this.startRound();
    }

    getFighterEntitiesClass(id) {
        switch (id) {
            case FighterId.RYU:
                return Ryu;
            case FighterId.KEN:
                return Ken;
            default:
                throw new Error('unimplemented fighter entity request');
        }
    }

    getFighterEntity(fighterState, index) {
        const fighterEntityClass = this.getFighterEntitiesClass(fighterState.id);

        return new fighterEntityClass(index, this.handleAttackHit.bind(this));
    }

    getFighterEntities() {
        const fighterEntities = gameState.fighters.map(this.getFighterEntity.bind(this));

        fighterEntities[0].opponent = fighterEntities[1];
        fighterEntities[1].opponent = fighterEntities[0];

        return fighterEntities;
    }

    getHitSplashClass(strength) {
        switch(strength) {
            case FighterAttackStrength.LIGHT:
                return LightHitSplash;
            case FighterAttackStrength.MEDIUM:
                return MediumHitSplash;
            case FighterAttackStrength.HEAVY:
                return HeavyHitSplash;
            default:
                throw new Error('Unknown strength request!');
        }
    }

    addEntity(entityClass, ...args) {
        this.entities.push(new entityClass(...args, this.removeEntity.bind(this)));
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);

        if (index < 0 ) return;
        this.entities.splice(index, 1); 
    }

    handleAttackHit(time, playerId, opponentId, position, strength) {
        gameState.fighters[playerId].score += FighterAttackBaseData[strength].score;
        gameState.fighters[opponentId].hitPoints -= FighterAttackBaseData[strength].damage; 

        this.hurtTimer = time.previous + (FIGHTER_HURT_DELAY * FRAME_TIME); //被擊打時的凍結幀
        this.fighterDrawOrder = [playerId, opponentId]; 
        this.addEntity(this.getHitSplashClass(strength), position.x, position.y, playerId);
    }
    
    startRound() {

        this.fighters = this.getFighterEntities();
        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - 192, 16, this.fighters);
        this.shadows = this.fighters.map(fighter => new Shadow(fighter));

    }

    updateFighters(time, context) {
        for (const fighter of this.fighters) {
            if (time.previous < this.hurtTimer) {
                fighter.updateHurtShake(time, this.hurtTimer);
            } else{
                fighter.update(time, context, this.camera);
            }
        }
    }

    updateShadows(time, context) {
        for (const shadow of this.shadows) {
            shadow.update(time, context, this.camera);
        }
    }

    updateEntities(time, context) {
        for (const entity of this.entities) {
            entity.update(time, context, this.camera);
        }
    }

    updateOverlays(time, context) {
        for (const overlay of this.overlays) {
            overlay.update(time, context, this.camera);
        }
    }

    update(time, context) {
        this.updateFighters(time, context);
        this.updateShadows(time, context);
        this.stage.update(time);
        this.updateEntities(time, context);
        this.camera.update(time, context);
        this.updateOverlays(time, context);
    }

    drawFighters(context) {
        for (const fighterId of this.fighterDrawOrder) {
            this.fighters[fighterId].draw(context, this.camera);
        }
    }

    drawShadows(context) {
        for (const shadow of this.shadows) {
            shadow.draw(context, this.camera);
        }
    }

    drawEntities(context) {
        for (const entity of this.entities) {
            entity.draw(context, this.camera);
        }
    }

    drawOverlays(context) {
        for (const overlay of this.overlays) {
            overlay.draw(context, this.camera);
        }
    }

    draw(context) {
        this.stage.drawBackground(context, this.camera);
        this.drawShadows(context);
        this.drawFighters(context);
        this.drawEntities(context);
        this.stage.drawForeground(context, this.camera);
        this.drawOverlays(context);
    }
}