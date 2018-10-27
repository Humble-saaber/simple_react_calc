import React from 'react';

export default (props) => {
  return (
      <button className="inputButton" onClick={props.inputFunc}>{props.digit}</button>
  )
}

//No logic here, just simple rendering of a grey digit button;