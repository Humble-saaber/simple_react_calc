import React from 'react';

export default (props) => {
    return (
        <button className="memoryButton" onClick={props.func}>{props.sign}</button>
    )
}