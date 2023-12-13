import { HitSplash } from './HitSplash.js';

export class HeavyHitSplash extends HitSplash {
    constructor(x, y, playerId, onEnd) {
        super(x, y, playerId, onEnd);

        this.frames = [
            //player 1
            [[14, 68, 15, 21], [7, 10]],
            [[38, 70, 27, 23], [13, 11]],
            [[73, 70, 27, 23], [13, 11]],
            [[106, 66, 32, 31], [16, 15]],

            //player 2
            [[160, 68, 15, 21], [7, 10]],
            [[185, 70, 27, 23], [13, 11]],
            [[222, 70, 27, 23], [13, 11]],
            [[255, 66, 32, 31], [16, 15]],
        ];
    }

    update(time) {
        super.update(time);
    }

    draw(context, camera) {
        super.draw(context, camera);
    }
}