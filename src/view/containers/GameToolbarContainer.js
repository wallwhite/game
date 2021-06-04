import React from 'react';
import { useSelector } from 'react-redux';
import { find, propEq } from 'ramda';
import { speedItems } from '../../constants';
import { useDispatchAction } from '../../hook';
import {
    selectGameIsReady,
    selectGameScore,
    selectGameIsStarted,
    selectGameIsPaused,
    selectGameTimeSpeed,
} from '../../store/selectors/gameSelectors';
import { gameRequestPause, gameRequestStart, gameRequestResume, gameRequestChangeSpeed } from '../../store/actions';
import { ButtonSwitcher } from '../components';

const GameToolbarContainer = () => {
    const isReadyGame = useSelector(selectGameIsReady);
    const score = useSelector(selectGameScore);
    const isStarted = useSelector(selectGameIsStarted);
    const isPaused = useSelector(selectGameIsPaused);
    const timeSpeed = useSelector(selectGameTimeSpeed);

    const gamePause = useDispatchAction(gameRequestPause);
    const gameStart = useDispatchAction(gameRequestStart);
    const gameResume = useDispatchAction(gameRequestResume);
    const gameSetSpeed = useDispatchAction(gameRequestChangeSpeed);

    const activeItem = find(propEq('value', timeSpeed))(speedItems);
    const isRenderPlayButton = isPaused || !isStarted;
    const isRenderPauseButton = !isPaused && isStarted;

    if (!isReadyGame) return null;

    const handleStart = () => {
        if (!isStarted) {
            gameStart();
            return;
        }
        gameResume();
    };

    const handlePause = () => {
        gamePause();
    };

    const handleChangeSpeed = ({ value }) => {
        gameSetSpeed(value);
    };

    return (
        <div className="game-toolbar">
            <div className="game-toolbar__score">
                <div className="game-toolbar__score-title">Score</div>
                <div className="game-toolbar__score-value">{score}</div>
            </div>
            <div className="game-toolbar__footer">
                <div className="game-toolbar__control game-toolbar__footer-control">
                    <span className="game-toolbar__control-label">Time speed</span>
                    <ButtonSwitcher options={speedItems} active={activeItem} onChange={handleChangeSpeed} />
                </div>
                {isRenderPauseButton && (
                    <div className="game-toolbar__footer-control">
                        <button
                            type="button"
                            className="button-old-school button-old-school--pause"
                            onClick={handlePause}
                        >
                            pause
                        </button>
                    </div>
                )}
                {isRenderPlayButton && (
                    <div className="game-toolbar__footer-control">
                        <button
                            type="button"
                            className="button-old-school button-old-school--play"
                            onClick={handleStart}
                        >
                            start
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameToolbarContainer;
