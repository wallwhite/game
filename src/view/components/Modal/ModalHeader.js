// @flow

import React from 'react';

type ModalHeaderProps = {
    title: string,
    style?: Object,
    onClose: () => void,
};

const ModalHeader = ({ title, onClose, style }: ModalHeaderProps) => (
    <header className="modal__header" style={style}>
        <button type="button" label="Close" className="modal__button-close" onClick={onClose} />
        <div className="modal__header-content">{title}</div>
    </header>
);

ModalHeader.defaultProps = {
    style: {},
};

export default ModalHeader;
