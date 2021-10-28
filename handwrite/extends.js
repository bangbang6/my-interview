function B(name){
  this.name = name;
};
function A(name,age){
  //!etPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。 A的显示原型是B这个对象 Object.setPrototypeOf(obj, prototype)
  Object.setPrototypeOf(A,B)//!这样A的实例的隐士原型就指向B
  //2.用A的实例作为this调用B,得到继承B之后的实例，这一步相当于调用super
  Object.getPrototypeOf(A).call(this, name)
  //3.将A原有的属性添加到新实例上
  this.age = age; 
  //4.返回新实例对象
  return this;
};
var a = new A('poetry',22);
console.log(a);