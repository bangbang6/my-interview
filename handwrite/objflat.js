function objFlat(obj){
  let result = []
  flat(obj)
  function flat(obj,prekey=''){
    for(let key in obj){
      let newKey = prekey?`${prekey}.${key}`:`${key}`
      if(typeof obj[key] === 'object' && obj){
        flat(obj[key],newKey)
      }else{
        result[newKey] = obj[key]
      }
    }
  }
  return result
}


const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }
console.log(objFlat(source));