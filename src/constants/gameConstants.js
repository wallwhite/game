export const gravity = 0.9;
export const drag = 0.98;
export const friction = 0.5;
export const bounce = 0.4;
export const slingWidth = 60;
export const slingHeight = 150;

export const maxStrengthRadius = 140;

export const initialRubberBackPos = [20, -55, 20, 20];
export const initialRubberFrontPos = [-15, -50, 20, 20];

export const speedItems = [
    { value: 10, name: '1' },
    { value: 20, name: '2' },
    { value: 60, name: '3' },
];

export const blocksY = 15;

export const backgroundTextures = {
    bg1: './static/bg1.png',
    bg2: './static/bg2.png',
};

export const worldTextures = {
    ground: './static/ground.png',
    damper: './static/damber.png',
};

export const characterTextures = {
    birdIdle: './static/bird_idle.png',
    birdFlight: './static/bird_flight.png',
};

export const slingTextures = {
    slingBack: './static/sling_back.png',
    slingFront: './static/sling_front.png',
};

export const GAME_MEDIATOR_EVENTS = {
    RENDERER_READY: 'RENDERER_READY',
    SCENE_READY: 'SCENE_READY',
    BG_READY: 'BG_READY',
    MAP_READY: 'MAP_READY',
    CHARACTER_READY: 'CHARACTER_READY',
    SLING_READY: 'SLING_READY',
    TEXTURES_READY: 'TEXTURES_READY',
    GAME_OVER: 'GAME_OVER',
    CHANGE_SCORE: 'CHANGE_SCORE',
    GAME_READY: 'GAME_READY',
};
