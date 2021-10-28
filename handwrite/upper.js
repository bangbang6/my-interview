function upper(name){
  let strs = name.split('-')
  strs = strs.map((str,i)=>{
   if(i===0) return str
   let s =str[0].toLocaleUpperCase()
 
    strArr = str.split('')
    strArr.splice(0,1,s)
   console.log('str',strArr.join(''));
    return strArr.join('')
    
  })
  return strs.join('')
}

var f = function(s) {
  return s.replace(/-\w/g, function(x) {
      return x.slice(1).toUpperCase();
  })
}

console.log(upper("get-element-by-id"))
