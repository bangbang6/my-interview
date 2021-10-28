function ajax(url,method){
  return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest()
    xhr.open(url,method,true)
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if((xhr.status >=200 && xhr.status <300) || xhr.status === 304 ){
          resolve(xhr.responseText)
        }
      }else{
        //请求体没有全部回来
        reject('请求失败')
      }
    }//数据请求状态转变完成
    xhr.send(null)
  })
}