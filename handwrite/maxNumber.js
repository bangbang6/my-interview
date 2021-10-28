function maxN(str){
  str=str.split('').sort().join('')
  let max = 0
  let count = 1
  let ch = str[0]
  for(let i = 1;i<str.length;i++){
    if(str[i]===str[i-1]){
      count++
    }
    if(str[i]!==str[i-1]){
      if(count>max){
        max = count
        ch = str[i-1]
        count=1
      }
    }
    if(i === str.length-1){
      if(count>max){
        max = count
        ch = str[i-1]
       
      }
    }
  }
  console.log(max,ch)
}
console.log(maxN("acbcabcabcbbccccc"))