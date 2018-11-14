import roundTo from 'round-to';


const tooLongDigitHandling = digit => {
  if (String(Math.trunc(digit)).length > 15) {
      throw new Error('Too big number! Use more complicated calcs to work with such numbers ^_^'); //This is junior pet project, its hard for this calc to properly do rocket science :)
  }
  if (String(digit).length > 15) {
   return roundTo(digit, 14); // prevents too long digits to be shown outside display's edges. 
  }
  return digit;
}



export const twoValuesOperations = {
      addition : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          const answer = inpt + mem;
          return tooLongDigitHandling(answer);
      },
      substraction : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          const answer = mem - inpt;
          return tooLongDigitHandling(answer);
      },
      multiplication : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          const answer = inpt * mem;
          return tooLongDigitHandling(answer);
      },
      division : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          const answer = mem / inpt;
          return tooLongDigitHandling(answer);
      },
      exponentiation : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          const answer = mem ** inpt;
          return tooLongDigitHandling(answer);
      },
      log : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          const answer = Math.log(inpt) / Math.log(mem);
          return tooLongDigitHandling(answer);
      },
  };
export const oneValueOperations = {
      sqrt : (inpt) => {
          if (inpt < 0) {
              throw new Error('Impossibe evaluation');
          }
          const answer = Math.sqrt(inpt);
          return tooLongDigitHandling(answer);
      },
      posNeg : (inpt) => {
          return inpt * (-1);
      },
      interest : (inpt, mem, operation) => {
          if (!operation) {
              return inpt;
          }
        const answer = twoValuesOperations[operation](mem, ((mem/100) * mem));
        return tooLongDigitHandling(answer)
      },
      evaluate : (inpt, mem, operation) => {
          if (!operation) {
              return inpt;
          }
        const answer = twoValuesOperations[operation](inpt, mem);
        return tooLongDigitHandling(answer);
      }
    };


  /* Adding two operation objects allow us to easily update and expand calc abilities. Component of button itself has no logic - only string with type key.
   If there is any operation in a queue, evaluates an aswer, displays and memorizes it. oneValueOperations object consists of function which require only one number to operate
   (excliding 'evaluate'). In fact, 'interest' also operates only with memoryCell - input just shows percents. 'evaluate' is added here because, as 'interest', it also requires 'operation'
   as a third argument. 
  */