function createCache(){
  const data = {}
  return {
    set(key,val){
      data[key]=val
    },
    get(key){
      return data[key]
    }
  }
}

let a
for(let i=0;i<10;i++){
  a = document.createElement('a')
  a.innerHTML = i+'<br>'
  a.addEventListener('click',()=>{
    console.log(i);
  })
  document.body.appendChild(a)
}