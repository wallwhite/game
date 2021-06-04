import { all, fork } from 'redux-saga/effects';

import sagas from './sagas';

export default function* rootSaga() {
    yield all(sagas.map(fork));
}
