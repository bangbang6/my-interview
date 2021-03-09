function throttle(cb,delay){
  let timer
  return function(){
      if(timer) return
      timer = setTimeout(()=>{
          cb()
          timer = null
      },delay)
  }
}