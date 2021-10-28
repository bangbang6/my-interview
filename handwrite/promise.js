Promise.resolve = function(param){
  if(param instanceof Promise) return param
  return new Promise(resolve,reject){
    if(param && param.then && typeof param.then === 'function') {
      // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
      param.then(resolve, reject);
    }else{
     resolve(param)
    }
  }
}
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
      reject(reason);
  });
}
Promise.prototype.finally = function(cb){
  this.then(value=>{
    return Promise.resolve(cb()).then(()=>{
      return value   
    })
  },error=>{
    return Promise.resolve(cb()).then(()=>{
      throw error
    })
  })
}

Promise.all = function(promises){
  return new Promise((resolve,reject)=>{
    let result = []
    let count = 0
    let len = promises.length
    if(len === 0) {
      resolve(result);
      return;
    }
    for(let i = 0;i<len;i++){
      promise[i].then(data=>{
        count++
        result[i]=data
        if(count === len) resolveI(result)
      }).catch(e=>{
        reject(e)
      })
    }
  })
}

Promise.allSettled = function(promises){
  return new Promise((resolve,reject)=>{
    let result = []
    let count = 0
    let len = promises.length
    if(len === 0) {
      resolve(result);
      return;
    }
    for(let i = 0;i<len;i++){
      promise[i].then(data=>{
        count++
        result[i]={
          status:'fulfilled',
          value:data
        }
        if(count === len) resolve(result)
      },
      reason=>{
        count++
        result[i]={
          status:'rejected',
          reason
        }
        if(count === len) resolve(result)
      }
      
      )
    }
  })
}

Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    let len = promises.length
    if(len === 0) return
    for(let i = 0;i<len;i++){
      promises[i].then(data=>{
        resolve(data)
        return
      }).catch(e=>{
        reject(err);
        return;
      })
    }
  })
}


function myPromise(constructor){
  let self = this
  let status = 'pending'
  self.value = undefined
  self.reason = undefined
  function resolve(value){
    if(self.status === 'pending'){
      self.status = 'resolved'
      self.value = value
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.status = 'rejected'
      self.reason = reason
    }
  }
  try{
    constructor(resolve,reject)
  }catch(e){
    reject(e)
  }
}
myPromise.prototype.then((onFullfilled,onRejected)=>{
  if(this.status === 'resolved'){
    onFullfilled(this.value)
    return
  }
  if(this.status === 'rejected'){
    onRejected(this.reason)
    return
  }
  if(this.status === 'pending'){
    // this.resolvedCallbacks.push(onFulfilled);
    // this.rejectedCallbacks.push(onRejected)
  }
})