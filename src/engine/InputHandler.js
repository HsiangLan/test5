import { controls } from '../config/controls.js';
import { Control } from '../constants/control.js';
import { FighterDirection } from '../constants/fighter.js';

const heldkeys = new Set()
const pressedKeys = new Set();

const mappedKeys = controls.map(({ keyboard }) => Object.values(keyboard)).flat();//使preventDefault不會常駐

function handleKeyDown(event) {
    if (!mappedKeys.includes(event.code)) return;

    event.preventDefault();//阻止任何網頁按鍵預設操作,並可用CODE覆蓋(如F5重整頁面,F12開發者工具失靈)
    heldkeys.add(event.code);
}

function handleKeyUp(event) {
    if (!mappedKeys.includes(event.code)) return;

    event.preventDefault();
    heldkeys.delete(event.code);
    pressedKeys.delete(event.code);
}

export function registerKeyboardEvents() { //監聽玩家鍵盤輸入
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}


export const isKeyDown = (code) => heldkeys.has(code);
export const isKeyUp = (code) => !heldkeys.has(code);

export function isKeyPressed(code) {
    if (heldkeys.has(code) && !pressedKeys.has(code)) {
        pressedKeys.add(code);
        return true;
    }

    return false;
}

//export const isControlDown = (id, control) => isKeyDown(controls[id].keyboard[control]);

export const isControlPressed = (id, control) => isKeyPressed(controls[id].keyboard[control]);

export const isLeft = (id) => isKeyDown(controls[id].keyboard[Control.LEFT]);
export const isRight = (id) => isKeyDown(controls[id].keyboard[Control.RIGHT]);
export const isUp = (id) => isKeyDown(controls[id].keyboard[Control.UP]);
export const isDown = (id) => isKeyDown(controls[id].keyboard[Control.DOWN]);

export const isForward = (id,direction) => direction == FighterDirection.RIGHT ? isRight(id) : isLeft(id);
export const isBackward = (id,direction) => direction == FighterDirection.LEFT ? isRight(id) : isLeft(id);

export const isIdle = (id) => !(isLeft(id) || isRight(id) ||isUp(id) || isDown(id));//閒置

export const isLightPunch = (id) => isControlPressed(id, Control.LIGHT_PUNCH);
export const isMediumPunch = (id) => isControlPressed(id, Control.MEDIUM_PUNCH);
export const isHeavyPunch = (id) => isControlPressed(id, Control.HEAVY_PUNCH);

export const isLightKick = (id) => isControlPressed(id, Control.LIGHT_KICK);
export const isMediumKick = (id) => isControlPressed(id, Control.MEDIUM_KICK);
export const isHeavyKick = (id) => isControlPressed(id, Control.HEAVY_KICK);