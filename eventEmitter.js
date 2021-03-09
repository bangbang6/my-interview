
class eventEmitter { 
	constructor(){
    this.events = {}
	}
	
	on(name,cb){
		if(!name || !cb){
			return
		}
    if(this.events[name]){
      
      this.events[name].push(cb)
    }else{
      this.events[name] = []
      this.events[name].push(cb)
    }
	}
	emit(name,...args){
		for(let i = 0;i<this.events[name].length;i++){
			let cb = this.events[name][i]
			cb.call(this,...args)
			
		}
	}
	off(name,cb){
		for(let i = 0;i<this.events[name].length;i++){
			if(cb === this.events[name][i]){
				this.events[name].splice(i,1)
			}
			
		}
	}
	
}

let t = new eventEmitter()
t.on('say',()=>{
    console.log('hello Bbang');
})
function f2(){
  
    console.log('hello zhen');
  
}
t.on('say',f2)
t.emit('say')
t.off('say',f2)
t.emit('say')
