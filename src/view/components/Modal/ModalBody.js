// @flow

import React from 'react';
import classNames from 'classnames';

type ModalBodyProps = {
    children: React.React$Node,
    className?: string,
    style?: {
        [key: string]: string | number,
    },
};

const ModalBody = ({ children, className, style }: ModalBodyProps) => (
    <div className={classNames('modal__body', className)} style={style}>
        {children}
    </div>
);

ModalBody.defaultProps = {
    className: '',
    style: {},
};

export default ModalBody;
