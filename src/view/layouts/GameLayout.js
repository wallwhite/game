// @flow
import React from 'react';
import { GameContainer } from '../containers';

type GameLayoutProps = {
    children: any,
};

const GameLayout = ({ children }: GameLayoutProps) => {
    return (
        <div className="game-layout">
            <GameContainer />
            {children}
        </div>
    );
};

export default GameLayout;
