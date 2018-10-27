
import React from 'react';
import ReactDOM from 'react-dom';
import Calc from './Calc.jsx';
import './styles/styles.less';

ReactDOM.render( <Calc />, 
    document.getElementById("container")
);

module.hot.accept();