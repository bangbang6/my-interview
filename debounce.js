function debounce(fn,delay){
	let timer  //timer在闭包中
    return function(){
        timer && clearTimeout(timer)
    	  timer = setTimeout(()=>{
        	
        fn.apply(this,arguments)
    },delay)    
    }
    
}

function log(){
  console.log(xxx);
}