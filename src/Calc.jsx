import React from 'react';
import DigitButton from './buttons/DigitButton.jsx';
import LogicButton from './buttons/LogicButton.jsx';
import MemoryButton from './buttons/MemoryButton.jsx';
import { oneValueOperations, twoValuesOperations } from './calcLogic/evaluationLogic.js'

export default class Calc extends React.Component {
    constructor() {
        super();
        this.state = {currentInput : '0', memoryCell : null, memorizedNumber : 0, evaluateOperation : null, inputMode : false }; 
        }
    /*In the begginig there is 0 as a current input(digit which is showed on a panel), memory cell is empty and no operation is in queue. 
    inputMode is responsible for whether input digit should be added to current input or create a new one.
    */

    inputNumber = (num) => (e) => {
      e.preventDefault();
      const { currentInput, inputMode } = this.state;
      if (currentInput.length > 14) {
        return;
      }
      if (currentInput === '0') {
          this.setState({ currentInput : `${num}`, inputMode: true})
          return;
      }
      inputMode ? this.setState({ currentInput : currentInput + num }) :  this.setState({ currentInput : `${num}`, inputMode : true });
    }
    /*Depending on inputMode, simply adds a num to currentInput (through concatenation 'cause a String type is used) or starts a new digit insertion.
    Pay attention to zero handling. If there is only zero as currentInput, it simply replaces it and set inputMode as true. So no '0000' digits will be shown on a panel.
    */

    reset = (e) => {
      e.preventDefault();
      this.setState({ currentInput : '0', memoryCell : null, memorizedNumber : 0, evaluateOperation : null, inputMode : false });
    }
    //Restore an initial state of the application.

    evaluationTwoValues = (type) => (e) => {
      e.preventDefault();
      try{
        const { evaluateOperation, currentInput, memoryCell, inputMode } = this.state;
        if (!inputMode) {
          this.setState({ evaluateOperation : type, inputMode : false });
          return;
        } // 1
        if (evaluateOperation && inputMode) {
          const answer = twoValuesOperations[evaluateOperation](Number(currentInput), memoryCell);
          this.setState({ currentInput : `${answer}`, memoryCell : answer, evaluateOperation : type, inputMode : false });
          return;
        } //2
        this.setState({ evaluateOperation : type, memoryCell : Number(currentInput), inputMode : false }); //3
      } catch(e) {
        alert(e.message);
        this.setState({ currentInput : '0', memoryCell : null, memorizedNumber : 0, evaluateOperation : null, inputMode : false });
      }
    }
    /* Has 3 cases. 1 -If the user tapped button which logic operation requeres two arguments and he hasn't added enough, the evaluteOperation state prop will just be changed, 
    but no evaluation happens.
    2 - If any evaluateOperation is in the queue and inputMode is true (it means user added second argument), evaluation happens and answer is shown on the display and also memorized.
    3 - Basic case. After the first argument has been input, the user taps logic operation button. Now the calculator is ready to recieve the second argument and evaluate the answer. 
    The second case is added to emulate behavior of a real calculator - the user simply may not even use '=' button and tap only logic operations buttons - every next tapping is evaluating
    previous operation answer, as a chain.    
    */
    evaluationOneValue = (type) => (e) => {
        e.preventDefault();
        const { evaluateOperation, currentInput, memoryCell, inputMode } = this.state;
        try {
        const answer = oneValueOperations[type](Number(currentInput), memoryCell, evaluateOperation);
        type === 'evaluate' ? this.setState({ currentInput : `${answer}`, memoryCell: answer, evaluateOperation : null, inputMode : false }) : this.setState({ currentInput : `${answer}`, inputMode : false });    
        } catch (e) {
            alert(e.message);
            this.setState({ currentInput : '0', memoryCell : null, memorizedNumber : 0, evaluateOperation : null, inputMode : false });
        }
        
    }
        // This method use operations which require only currentInput value, sqrt for instance. 'Evaluate' is a special one - it sets evaluateOperation to null, also writes an answer to memoryCell.

    memorizedNumberController = (type) => (e) => {
      e.preventDefault();
      const { currentInput, memorizedNumber } = this.state;
      if (type === "MRC") {
        this.setState({ currentInput : String(memorizedNumber)});
        return;
      }
      type === 'M+' ? this.setState({memorizedNumber : Number(currentInput)}) : this.setState({memorizedNumber : Number(currentInput) * -1});
    }
    /*Special feature that allows a user to memorize some number through working process and use later in further calculations. M+ memorizes currentInput.
    M- memorizes a negative currentInpute. MRC simply inserts memorizedNumber instead currentInput.
    */

    addPoint = (e) => {
      e.preventDefault();
      const { currentInput, inputMode } = this.state;
      if (inputMode) {
      currentInput.includes('.') ? this.setState({ currentInput: `${currentInput}`, inputMode: true }) : this.setState({ currentInput: `${currentInput}.`, inputMode : true}); 
      return;
      }
      this.setState({ currentInput : '0.', inputMode : true });
    }
    //A specific method for point is added because it allows to make a number fractional. The ternary operator prevents adding multiple points to a number.

    render() {
        return (
            <div className="calcBody">
            <div className="calcName">
            <span className={'companyName'}>{'CITIZEN '}</span><span className={'modelNum'}>{'SDC-805BN'}</span>
            </div>
            <div className="inputWindow">{this.state.currentInput}</div>
            <div className='inputPanel'>
              <MemoryButton func={this.memorizedNumberController('MRC')} sign={'MRC'} />
              <DigitButton inputFunc={this.inputNumber(7)} digit={7} />
              <DigitButton inputFunc={this.inputNumber(4)} digit={4} />
              <DigitButton inputFunc={this.inputNumber(1)} digit={1} />
              <DigitButton inputFunc={this.inputNumber(0)} digit={0} />
              <MemoryButton func={this.memorizedNumberController('M-')} sign={'M-'} />
              <DigitButton inputFunc={this.inputNumber(8)} digit={8} />
              <DigitButton inputFunc={this.inputNumber(5)} digit={5} />
              <DigitButton inputFunc={this.inputNumber(2)} digit={2} />
              <DigitButton inputFunc={this.addPoint} digit={'.'} />
              <MemoryButton func={this.memorizedNumberController('M+')} sign={'M+'} />
              <DigitButton inputFunc={this.inputNumber(9)} digit={9} />
              <DigitButton inputFunc={this.inputNumber(6)} digit={6} />
              <DigitButton inputFunc={this.inputNumber(3)} digit={3} />
              <LogicButton func={this.evaluationOneValue('evaluate')} sign={'='} />
            </div>
            <div className='logicPanel'>
            <LogicButton func={this.evaluationTwoValues('addition')} sign={'+'} />
            <LogicButton func={this.evaluationTwoValues('substraction')} sign={'-'} />
            <LogicButton func={this.evaluationTwoValues('multiplication')} sign={'*'} />
            <LogicButton func={this.evaluationTwoValues('division')} sign={'/'} />
            <LogicButton func={this.evaluationTwoValues('exponentiation')} sign={'x^y'} />
            <LogicButton func={this.evaluationTwoValues('log')} sign={'log a b'} />
            <LogicButton func={this.evaluationOneValue('interest')} sign={'%'} />
            <LogicButton func={this.evaluationOneValue('posNeg')} sign={'+/-'} />
            <LogicButton func={this.evaluationOneValue('sqrt')} sign={'sqrt'} />
            <LogicButton func={this.reset} sign={'ON/C'} />
            </div>
            </div>
        )
    }

    
}