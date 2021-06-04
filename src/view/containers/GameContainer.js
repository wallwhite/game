import React, { useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { find, propEq } from 'ramda';
import { Game } from '../game';
import { speedItems } from '../../constants';
import { useDispatchAction } from '../../hook';
import { gameSetEntity, gameSetIsReady, gameSetIsGameOver, gameSetScore } from '../../store/actions';
import { selectGameIsReady, selectGameTimeSpeed } from '../../store/selectors/gameSelectors';

const GameContainer = () => {
    const gameCanvasRef = useRef();
    const isReadyGame = useSelector(selectGameIsReady);
    const timeSpeed = useSelector(selectGameTimeSpeed);
    const setEntity = useDispatchAction(gameSetEntity);
    const setReady = useDispatchAction(gameSetIsReady);
    const setIsGameOver = useDispatchAction(gameSetIsGameOver);
    const setScore = useDispatchAction(gameSetScore);

    const activeItem = find(propEq('value', timeSpeed))(speedItems);

    const handleGameReady = () => {
        setReady(true);
    };

    const handleGameOver = () => {
        setIsGameOver(true);
    };

    const handleChangeScore = ({ score }) => {
        setScore(score);
    };

    useLayoutEffect(() => {
        const { current: gameCanvas } = gameCanvasRef;

        if (gameCanvas) {
            const gameEntity = new Game(gameCanvas, handleGameReady, handleGameOver, handleChangeScore);

            gameEntity.speed = activeItem.value;

            setEntity(gameEntity);
        }
    }, []);

    const gameClassName = classNames('game', {
        'game--ready': isReadyGame,
    });

    return <canvas id="game" className={gameClassName} ref={gameCanvasRef} />;
};

export default GameContainer;
