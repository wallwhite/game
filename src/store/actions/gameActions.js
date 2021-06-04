import {
    GAME_SET_ENTITY,
    GAME_SET_IS_READY,
    GAME_SET_IS_GAME_OVER,
    GAME_SET_SCORE,
    GAME_SET_MAX_SCORE,
    GAME_REQUEST_RETRY,
    GAME_REQUEST_PAUSE,
    GAME_REQUEST_RESUME,
    GAME_SET_IS_PAUSED,
    GAME_REQUEST_CHANGE_SPEED,
    GAME_SET_SPEED,
    GAME_REQUEST_START,
    GAME_SET_IS_STARTED,
} from '../../constants';

export const gameSetEntity = entity => ({
    type: GAME_SET_ENTITY,
    payload: { entity },
});

export const gameSetIsReady = isReady => ({
    type: GAME_SET_IS_READY,
    payload: { isReady },
});

export const gameSetIsGameOver = isGameOver => ({
    type: GAME_SET_IS_GAME_OVER,
    payload: { isGameOver },
});

export const gameSetScore = score => ({
    type: GAME_SET_SCORE,
    payload: { score },
});

export const gameSetMaxScore = maxScore => ({
    type: GAME_SET_MAX_SCORE,
    payload: { maxScore },
});

export const gameRequestStart = () => ({
    type: GAME_REQUEST_START,
});

export const gameSetIsStarted = isStarted => ({
    type: GAME_SET_IS_STARTED,
    payload: { isStarted },
});

export const gameRequestRetry = () => ({
    type: GAME_REQUEST_RETRY,
});

export const gameRequestPause = () => ({
    type: GAME_REQUEST_PAUSE,
});

export const gameRequestResume = () => ({
    type: GAME_REQUEST_RESUME,
});

export const gameSetIsPaused = isPaused => ({
    type: GAME_SET_IS_PAUSED,
    payload: { isPaused },
});

export const gameRequestChangeSpeed = timeSpeed => ({
    type: GAME_REQUEST_CHANGE_SPEED,
    payload: { timeSpeed },
});

export const gameSetSpeed = timeSpeed => ({
    type: GAME_SET_SPEED,
    payload: { timeSpeed },
});
