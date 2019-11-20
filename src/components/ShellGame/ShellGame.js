import React, {useState} from 'react';
import Shell from '../Shell/Shell';
import "./style.css";

function ShellGame(props) {
    const initialState = [ <Shell key="pea0" />,  <Shell key="pea1" hasPea={true}/>, <Shell key="pea2" />]
    const [shells, setShells] = useState(initialState);

    const resetGame = () => setShells(initialState);
    const startGame = () => console.log("start game");
    
    return (
        <div class="shell-game">
            {shells}
        </div>
    );
}

export default ShellGame;
