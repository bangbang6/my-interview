function mycurry(fn,...args){
  let length = fn.length
  return function(...newargs){
    args = args.concat(newargs)
    console.log('args',args);
    if(args.length<length){
      return mycurry.call(this,fn,...args)
    }else{
      return fn.call(this,...args)
    }
  }
}
function multiFn(a, b, c) {
  return a * b * c;
}

var multi = mycurry(multiFn);


console.log('res',multi(2)(3,4));