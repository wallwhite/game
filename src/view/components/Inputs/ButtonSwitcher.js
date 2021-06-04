// @flow
import React from 'react';
import classNames from 'classnames';

type ButtonSwitcherOptionType = {
    value: string,
    name: string,
};

type ButtonSwitcherProps = {
    active: ButtonSwitcherOptionType,
    options: Array<ButtonSwitcherOptionType>,
    onChange: (option: ButtonSwitcherOptionType) => () => void,
};

const ButtonSwitcher = ({ active, options, onChange }: ButtonSwitcherProps) => (
    <div className="button-switcher">
        {options.map(option => (
            <button
                type="button"
                key={`button-switcher-key-${option.value}`}
                onClick={() => onChange(option)}
                className={classNames('button-switcher__item', {
                    'button-switcher__item--active': active.value === option.value,
                })}
            >
                {option.name}
            </button>
        ))}
    </div>
);

export default ButtonSwitcher;
