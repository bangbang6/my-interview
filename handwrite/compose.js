function compose(...funcs){
  if(funcs.length === 1) return funcs[0]

  return funcs.reduce((a,b)=>(...args)=>a(b(...args)))
}
const multiply = (x) => {
  const result = x * 10;
  console.log(result);
  return result;
};
const add = (y) => y + 10;
const minus = (z) => z - 2;
const calc = compose(minus, add, multiply);
console.log(calc(10));