import React from 'react';
import GameLayout from '../layouts/GameLayout';
import { GameToolbarContainer, GameOverModalContainer, WelcomeModalContainer } from '../containers';

const HomePage = () => (
    <GameLayout>
        <GameToolbarContainer />
        <GameOverModalContainer />
        <WelcomeModalContainer />
    </GameLayout>
);

export default HomePage;
