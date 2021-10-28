export function myFreeze(obj){
  if(obj instanceof Object){
    for(let key in obj){
      if(obj.hasOwnProperty(key)){
        object.defineProperty(obj,key,{
          writable:false,
        })
        myFreeze(obj[key]);
      }
    }
  }
}