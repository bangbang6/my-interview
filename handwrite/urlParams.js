function parseParam(url){
  
  let regExp = /(.+)\?(.+)$/
  let res = url.match(regExp)
  let obj =  res[2].split('&')
  let result = {}
  obj.forEach(val=>{
    if(/=/.test(val)){
      let [key,value] = val.split('=')
      value =decodeURIComponent(value) //url解码
      if(result[key]){
        result[key] = [].concat(result[key]).concat(value)
      }else{
        result[key] = value
      }
    }else{
      result[val] = true
    }
   
  })
  return result
}
console.log(parseParam('http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'))