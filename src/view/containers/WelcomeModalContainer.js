import React, { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from '../components';
import { selectGameBestScore } from '../../store/selectors/gameSelectors';

const WelcomeModalContainer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const bestScore = useSelector(selectGameBestScore);

    const onClose = () => setIsOpen(false);

    useLayoutEffect(() => {
        if (!bestScore) setIsOpen(true);
    }, []);

    return (
        <Modal className="modal--welcome" isOpen={isOpen} onRequestClose={onClose}>
            <ModalHeader title="How to play" onClose={onClose} />
            <ModalBody>
                <div className="modal__cell-wrapper">
                    <div className="modal__cell">
                        <div className="modal__cell-label">Click on the bird and move it to set trajectory</div>
                        <div className="modal__cell-image">
                            <img src="./static/howto1.png" alt="how to play 1" />
                        </div>
                    </div>
                    <div className="modal__cell">
                        <div className="modal__cell-label">
                            When you have set the values click the start button at the bottom
                        </div>
                        <div className="modal__cell-image">
                            <img src="./static/howto2.png" alt="how to play 2" />
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default WelcomeModalContainer;
