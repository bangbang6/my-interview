function myNew(fn,...args){
  let instance = Object.create(fn.prototype) //!一定是原型
  let res = fn.apply(instance,args)
  return typeof res === 'object'?res:instance
}


function Student(name){
  this.name = name
}
console.log(myNew(Student,'bang'))