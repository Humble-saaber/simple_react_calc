import React from 'react';

export default (props) => {
    return (
        <button className="logicButton" onClick={props.func}>{props.sign}</button>
    )
}