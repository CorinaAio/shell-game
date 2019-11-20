import React from 'react';
import Shell from '../Shell/Shell';
import "./style.css";

function ShellGame(props) {
  return (
      <div class="shell-game">
        <Shell hasPea={true}/>
        <Shell />
        <Shell />
      </div>
  );
}

export default ShellGame;
