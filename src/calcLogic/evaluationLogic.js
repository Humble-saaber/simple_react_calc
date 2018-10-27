export const twoValuesOperations = {
      addition : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          return inpt + mem;
      },
      substraction : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          return mem - inpt;
      },
      multiplication : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          return inpt * mem;
      },
      division : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          return mem / inpt;
      },
      exponentiation : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          return mem ** inpt;
      },
      log : (inpt, mem) => {
          if (!mem) {
              return inpt;
          }
          return Math.log(inpt) / Math.log(mem);
      },
  };
export const oneValueOperations = {
      sqrt : (inpt) => {
          if (inpt < 0) {
              return new Error('Impossibe evaluation');
          }
        return Math.sqrt(inpt);
      },
      posNeg : (inpt) => {
          return inpt * (-1);
      },
      interest : (inpt, mem, operation) => {
          if (!operation) {
              return inpt;
          }
        return twoValuesOperations[operation](mem, ((mem/100) * mem));
      },
      evaluate : (inpt, mem, operation) => {
          if (!operation) {
              return inpt;
          }
        return twoValuesOperations[operation](inpt, mem);
      }
    };


  /* Adding two operation objects allow us to easily update and expand calc abilities. Component of button itself has no logic - only string with type key.
   If there is any operation in a queue, evaluates an aswer, displays and memorizes it. 
  */