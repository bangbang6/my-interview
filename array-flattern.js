/* function flattern(arr){
	return arr.reduce((prev,next)=>{
		if(Array.isArray(next)){
		  	return prev.concat(flattern(next))
        
		}else{
      return prev.concat(next)
    }
	},[])
}

var arr = [[1,2],[2,3],[4,[5]]]
console.log('arr',flattern(arr)); */
function flattern(arr){
	while(arr.some(item=>Array.isArray(item))){
		arr = [].concat(...arr)
    
	}
	return arr
}

var arr = [[1,2],[2,3],[4,[5]]]
console.log('arr',flattern(arr));