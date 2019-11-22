import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import shuffle from 'lodash/shuffle';

import Button from '@material-ui/core/Button';

import Shell from '../Shell/Shell';
import "./style.css";

function ShellGame(props) {
    const initialState = [{
        ShellComp: (props) => <Shell {...props}/>,
        name: "shell0"
    }, {
        ShellComp: (props) => <Shell hasPea={true} {...props}/>,
        name: "shell1"
    }, {
        ShellComp: (props) => <Shell {...props}/>,
        name: "shell2"
    }];

    const [shells, setShells] = useState(initialState);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    const shuffleShells = () => {
        let turns = 0;
        setIsShuffling(true);
        let intervalId = setInterval(() => {
            if(turns === 10) {
                clearInterval(intervalId);
                setIsShuffling(false);
                return;
            }
            ++turns;
            setShells(shuffle);
        }, 800)
    }

    const resetGame = () => {
        setGameStarted(false);
        setGameEnded(false);
        setShells(initialState);
    }

    const startGame = () => {
        setGameStarted(true);
        shuffleShells();
    }

    const setGameScore = (gameWon) => {
        setIsGameWon(gameWon);
        setGameEnded(true);
    }

    const getMessageDisplay = () => {
        switch(true) {
            case isShuffling: return "Shuffling...";
            case (gameEnded && isGameWon):  return "You won :)";
            case (gameEnded && !isGameWon): return "You lost :(";
            case (gameStarted && !isShuffling):  return "Guess where the pea is";
        }
    }

    const blockUserAction = () => {
        return !gameStarted || isShuffling || gameEnded;
    }

    let width = 0;
    const transitions = useTransition(
      shells.map(shell => ({...shell,  x: (width += 250) - 250 })),
      s => s.name,
      {
        from: { width: 0, opacity: 0 },
        leave: { width: 0, opacity: 0 },
        enter: ({ x }) => ({ x, width: 250, opacity: 1 }),
        update: ({ x }) => ({ x, width: 250 })
      }
    );
    

    return (
        <div className="shell-game" >
            {transitions.map(({ item, props: { x,  ...rest }, key }, index) => {
            const  { ShellComp } = item
            return (
              <animated.div
                key={key}
                class="shell-wrapper"
                style={{ transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
                    <ShellComp onClick={score => setGameScore(score)} preventShellUncover={ blockUserAction } />
              </animated.div>
            )})}
            <div className="game-buttons">
                { !gameStarted && <Button onClick={startGame}>Start game</Button> }
                { gameEnded && <Button onClick={resetGame}>Restart</Button> }
            </div>
            <div className="game-message">
                { getMessageDisplay() }
            </div>
        </div>
    );
}

export default ShellGame;
