```js
class eventEmitter { 
	constrcutor(){
    this.events = {}
	}
	
	on(name,cb){
		if(!name || !cb){
			return
		}
		this.events[name] = this.events[name]?this.events[name].push(cb):[].push(cb)
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
}
```

类变量只能定义到constructor里面