import { Control } from "../constants/control.js";

export const controls = [
    {
        keyboard: {
            [Control.LEFT]:  'KeyA',
            [Control.RIGHT]:  'KeyD',
            [Control.DOWN]:  'KeyS',
            [Control.UP]:  'KeyW',
            [Control.LIGHT_PUNCH]: 'KeyU',
            [Control.MEDIUM_PUNCH]:'KeyI',
            [Control.HEAVY_PUNCH]: 'KeyO',
            [Control.LIGHT_KICK]: 'KeyJ',
            [Control.MEDIUM_KICK]:'KeyK',
            [Control.HEAVY_KICK]: 'KeyL',
        },
    },
    {
        keyboard: {
            [Control.LEFT]:  'ArrowLeft',
            [Control.RIGHT]:  'ArrowRight',
            [Control.UP]:  'ArrowUp',
            [Control.DOWN]:  'ArrowDown',
            [Control.LIGHT_PUNCH]: 'Numpad4',
            [Control.MEDIUM_PUNCH]:'Numpad5',
            [Control.HEAVY_PUNCH]: 'Numpad6',
            [Control.LIGHT_KICK]: 'Numpad1',
            [Control.MEDIUM_KICK]:'Numpad2',
            [Control.HEAVY_KICK]: 'Numpad3',
        },
    },
];