module.exports = function check(str, bracketsConfig) {
  let bracketsOpenArray = [];
  let bracketsPairObject = {};
  let bracketsIdenticalPair = {};
  let stack = [];
  let string = str;

  for (let k = 0; k < bracketsConfig.length; k++) {
    bracketsOpenArray.push(bracketsConfig[k][0])
    bracketsPairObject[`${bracketsConfig[k][1]}`] = `${bracketsConfig[k][0]}`;
    if (bracketsConfig[k][1] === bracketsConfig[k][0]) {
      bracketsIdenticalPair[`${bracketsConfig[k][1]}`] = `${bracketsConfig[k][0]}`;
    }
  }
  for (let i = 0; i < string.length; i++) {
    if (string[i + 1] in bracketsPairObject && bracketsPairObject[`${string[i + 1]}`] === string[i]) {
      let a = `${string[i]}${string[i + 1]}`;
      string = string.replace(a, '');
      i--;
    }
  }

  if (string === '') {
    return true;
  }

  for (let i = 0; i < string.length; i++) {
    let openSymbol = string[i];
    let stackSymbol = stack[stack.length - 1];
    if (bracketsOpenArray.includes(openSymbol)) {
      if (openSymbol !== bracketsIdenticalPair[stackSymbol]) {
        stack.push(openSymbol);
      } else {
        stack.pop();
      }
    } else {
      if (stack.length === 0) {
        return false;
      }
      if (bracketsPairObject[openSymbol] === stackSymbol) {
        stack.pop();
        console.log(stack)
      } else {
        return false;
      }
    }

  }
  if (stack.length === 0) {
    return true;
  } else {
    return false;
  }
}

