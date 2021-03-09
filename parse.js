function parse(obj,condition){
  let conditions = condition.replace(/\[/,'.').replace(/\]/,'').split('.')
   return conditions.reduce((prev,next)=>{
         return prev[next]
   },obj)
}


var object = {
 b: { c: 4 }, d: [{ e: 5 }, { e: 6 }]
};
console.log( parse(object, 'b.c') == 4 ) 
console.log( parse(object, 'd[0].e') == 5 ) 
