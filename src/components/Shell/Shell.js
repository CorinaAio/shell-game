import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import shellPic from "./seashell.png";
import "./style.css";

function Shell(props) {

    const [shellUncovered, setShellUncovered] = useState(false)

    const uncoverShell = () => {
        if(props.preventShellUncover()) return;

        setShellUncovered(true);
        props.onClick(props.hasPea);
    }

    const getClasses = () => {
        return `shell ${shellUncovered ? 'shell--uncovered' : ''}`
    }

    return (
    <Box className={getClasses()} onClick={uncoverShell}>
        <img src={shellPic} className="shell-image" alt="shell"/>
        {props.hasPea && <div className="pea"></div>}
    </Box>
    );
}

export default Shell;
