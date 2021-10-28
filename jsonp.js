function jsonp(url,callback){
  return new Promise((resolve,reject)=>{
    let script = document.createElement('script')
  script.src=url
  script.async = true
  script.type='text/javascript'
  window[callback] = function(data){
    resolve(data)
  }
  document.body.appendChild(script)
  script.onerror=function(err){
    if(window[callback]===null){
      reject('timeout')
    }else{
      reject('failed')
      window[callback]=null
    }
  }
  })
  
}