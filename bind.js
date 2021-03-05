Function.prototype.myBind = function(...args){
  if(args.length<1){
    return
  }  
  let ctx = args.shift()
  let fn = this //外部调用Bind的函数 即我们真正要执行的函数
  return function(){
    return fn.apply(ctx,args)
  }
}


function test(a){
  console.log(this);
  console.log(a);
}
let fn = test.myBind({x:100},1)
fn()