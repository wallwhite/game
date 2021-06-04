import { createSelector } from 'reselect';

const gameSelector = state => state.game;

export const selectGameEntity = createSelector(gameSelector, game => game.entity);

export const selectGameIsReady = createSelector(gameSelector, game => game.isReady);

export const selectGameIsGameOver = createSelector(gameSelector, game => game.isGameOver);

export const selectGameScore = createSelector(gameSelector, game => game.score);

export const selectGameBestScore = createSelector(gameSelector, game => game.maxScore);

export const selectGameIsStarted = createSelector(gameSelector, game => game.isStarted);

export const selectGameIsPaused = createSelector(gameSelector, game => game.isPaused);

export const selectGameTimeSpeed = createSelector(gameSelector, game => game.timeSpeed);
