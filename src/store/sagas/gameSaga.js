import { takeLatest, select, call, put, all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
    GAME_REQUEST_RETRY,
    GAME_REQUEST_PAUSE,
    GAME_REQUEST_RESUME,
    GAME_REQUEST_CHANGE_SPEED,
    GAME_REQUEST_START,
} from '../../constants';
import { selectGameEntity, selectGameScore, selectGameBestScore } from '../selectors/gameSelectors';
import { gameSetIsGameOver, gameSetMaxScore, gameSetIsPaused, gameSetSpeed, gameSetIsStarted } from '../actions';

function* gameRequestStartSaga() {
    const gameEntity = yield select(selectGameEntity);

    yield call(gameEntity.start);
    yield put(gameSetIsStarted(true));
}

function* gameRequestRetrySaga() {
    const gameEntity = yield select(selectGameEntity);
    const score = yield select(selectGameScore);
    const bestScore = yield select(selectGameBestScore);

    yield call(gameEntity.retry);
    yield put(gameSetIsGameOver(false));
    yield put(gameSetIsStarted(false));

    if (score > bestScore) yield put(gameSetMaxScore(score));
}

function* gameRequestPauseSaga() {
    const gameEntity = yield select(selectGameEntity);

    yield call(gameEntity.pause);
    yield put(gameSetIsPaused(true));
}

function* gameRequestResumeSaga() {
    const gameEntity = yield select(selectGameEntity);

    yield call(gameEntity.resume);
    yield put(gameSetIsPaused(false));
}

function* gameRequestChangeSpeed({ payload }) {
    const gameEntity = yield select(selectGameEntity);

    gameEntity.speed = payload.timeSpeed;

    yield put(gameSetSpeed(payload.timeSpeed));
}

export default function* gameSaga(): Saga<void> {
    yield all([
        takeLatest(GAME_REQUEST_START, gameRequestStartSaga),
        takeLatest(GAME_REQUEST_RETRY, gameRequestRetrySaga),
        takeLatest(GAME_REQUEST_PAUSE, gameRequestPauseSaga),
        takeLatest(GAME_REQUEST_RESUME, gameRequestResumeSaga),
        takeLatest(GAME_REQUEST_CHANGE_SPEED, gameRequestChangeSpeed),
    ]);
}
