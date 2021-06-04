import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from '../components';
import { useDispatchAction } from '../../hook';
import { selectGameIsGameOver, selectGameScore, selectGameBestScore } from '../../store/selectors/gameSelectors';
import { gameRequestRetry } from '../../store/actions';

const GameOverModalContainer = () => {
    const score = useSelector(selectGameScore);
    const bestScore = useSelector(selectGameBestScore);
    const isGameOver = useSelector(selectGameIsGameOver);

    const onRetry = useDispatchAction(gameRequestRetry);

    const onRetryButtonClick = () => onRetry();

    return (
        <Modal className="modal--game-over" isOpen={isGameOver} onRequestClose={() => {}}>
            <ModalHeader title="Game over" />
            <ModalBody>
                <div className="modal__score">
                    <div className="modal__score-label">Score:</div>
                    <div className="modal__score-value">{score}</div>
                </div>
                <div className="modal__score">
                    <div className="modal__score-label">Best score:</div>
                    <div className="modal__score-value">{bestScore}</div>
                </div>
                <div className="modal__center">
                    <button type="button" className="modal__button--retry" onClick={onRetryButtonClick}>
                        retry
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default GameOverModalContainer;
