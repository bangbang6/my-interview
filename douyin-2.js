var createPromise = function(time) {
 
   return new Promise((resolve, reject)=>{
    setTimeout(()=>{
     console.log('timein'+time)
     resolve();
    }, time*1000)
   })
  
 }

 //!串行
 var arr=[createPromise(2),createPromise(1),createPromise(3),createPromise(4),createPromise(5)];
//promise.then返回的就是个promise then里面执行下一个promise就是按顺序的
 function ser5Promise(arr){
   arr.reduce((prev,next)=>{
     return prev.then(next)
   },Promise.resolve())
 }

 ser5Promise(arr)

 //并行  //!自信 不要说自己哪里不会 除非真的不会 就说不会 多的不要说
 var arr=[createPromise(2),createPromise(1),createPromise(3),createPromise(4),createPromise(5)];
 function myPromiseAll(arr){
   return new Promise(resolve=>{
    let count = 0
    let res = []
    let len = arr.length
    for(let i =0;i<arr.length;i++){
      fetch(arr[i]).then(res2=>{
        res[i] = res2
        count++
        if(count === len){
          resolve(res)
        }
      })
    }
   })
    
 }