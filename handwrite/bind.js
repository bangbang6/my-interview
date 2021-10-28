function mybind(context,...outargs){
  let fn = this
  return function F(...innerargs){
    if(fn instanceof F){
      return new fn(...outargs,...innerargs)
    }
    return fn.apply(context,[...outargs,...innerargs])
  }
}