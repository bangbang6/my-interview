!(async function (){
  try{
    const a =1
    a=2
  }catch(err){
    console.log(err.message);
  }
})()