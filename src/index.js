module.exports = function check(str, bracketsConfig) {
  let bracketsOpenArray = [];
  let bracketsPairObject = {};
  let stack = [];
  let string = str;

  for (let k = 0; k < bracketsConfig.length; k++) {
    bracketsOpenArray.push(bracketsConfig[k][0])
    bracketsPairObject[`${bracketsConfig[k][1]}`] = `${bracketsConfig[k][0]}`;
  }

  for (let i = 0; i < string.length; i++) {
    if (string[i + 1] in bracketsPairObject && bracketsPairObject[`${string[i + 1]}`] === string[i]) {
      let a = `${string[i]}${string[i + 1]}`;
      string = string.replace(a, '');
    }
  }
  if (string === '') {
    return true;
  }

  for (let i = 0; i < string.length; i++) {
    let openSymbol = string[i];
    let stackSymbol = stack[stack.length - 1];
    if (stackSymbol === openSymbol) {
      stack.pop();
      if (stack.length === 0) {
        return true;
      }
    }
    if (bracketsOpenArray.includes(openSymbol)) {
      stack.push(openSymbol);
    } else {
      if (stack.length === 0) {
        return false;
      }
      if (bracketsPairObject[openSymbol] === stackSymbol) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
