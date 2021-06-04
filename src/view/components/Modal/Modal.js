// @flow

import React from 'react';
import ReactModal from 'react-modal';

type ModalProps = {
    isOpen: boolean,
    children: React.React$Node,
    className?: string,
    shouldCloseOnEsc?: boolean,
    onRequestClose: () => void,
};

const Modal = ({ className, children, ...props }: ModalProps) => (
    <ReactModal overlayClassName={`modal ${className || ''}`} className="modal__content" ariaHideApp={false} {...props}>
        {children}
    </ReactModal>
);

Modal.defaultProps = {
    className: '',
    shouldCloseOnEsc: true,
};

export default Modal;
