import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import shuffle from 'lodash/shuffle';

import Button from '@material-ui/core/Button';

import Shell from '../Shell/Shell';
import "./style.css";

function ShellGame(props) {
    const initialState = [{
        ShellComp: () => <Shell />,
        name: "shell0"
    }, {
        ShellComp: () => <Shell hasPea={true}/>,
        name: "shell1"
    }, {
        ShellComp: () => <Shell />,
        name: "shell2"
    }];

    const [shells, setShells] = useState(initialState);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);

    const shuffleShells = () => {
        let turns = 0;
        let intervalId = setInterval(() => {
            if(turns === 10) {
                clearInterval(intervalId);
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

    const setGameScore = () => {

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
        <div class="shell-game" >
            {transitions.map(({ item, props: { x,  ...rest }, key }, index) => {
            const  { ShellComp } = item
            return (
              <animated.div
                key={key}
                class="card"
                style={{ transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
                <div class="cell">
                    <div class="details"><ShellComp /></div>
                </div>
              </animated.div>
            )})}
            <div>
                { !gameStarted && <Button onClick={startGame}>Start game</Button> }
                { gameEnded && <Button onClick={resetGame}>Restart</Button> }
            </div>
        </div>
    );
}

export default ShellGame;
