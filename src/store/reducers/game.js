import {
    GAME_SET_IS_READY,
    GAME_SET_IS_GAME_OVER,
    GAME_SET_SCORE,
    GAME_SET_MAX_SCORE,
    GAME_SET_ENTITY,
    GAME_SET_SPEED,
    GAME_SET_IS_PAUSED,
    GAME_SET_IS_STARTED,
} from '../../constants';

const initialState = {
    entity: null,
    isReady: false,
    isGameOver: false,
    isPaused: false,
    isStarted: false,
    score: 0,
    maxScore: 0,
    timeSpeed: 60,
};

const game = (state = initialState, { type, payload }) => {
    switch (type) {
        case GAME_SET_ENTITY:
            return {
                ...state,
                entity: payload?.entity ?? state.entity,
            };
        case GAME_SET_IS_READY:
            return {
                ...state,
                isReady: payload?.isReady ?? !state.isReady,
            };
        case GAME_SET_IS_GAME_OVER:
            return {
                ...state,
                isGameOver: payload?.isGameOver ?? !state.isGameOver,
            };
        case GAME_SET_SCORE:
            return {
                ...state,
                score: payload?.score ?? state.score,
            };
        case GAME_SET_MAX_SCORE:
            return {
                ...state,
                maxScore: payload?.maxScore ?? state.maxScore,
            };
        case GAME_SET_SPEED:
            return {
                ...state,
                timeSpeed: payload?.timeSpeed ?? state.timeSpeed,
            };
        case GAME_SET_IS_PAUSED:
            return {
                ...state,
                isPaused: payload?.isPaused ?? !state.isPaused,
            };
        case GAME_SET_IS_STARTED:
            return {
                ...state,
                isStarted: payload?.isStarted ?? !state.isStarted,
            };
        default:
            return state;
    }
};

export default game;
