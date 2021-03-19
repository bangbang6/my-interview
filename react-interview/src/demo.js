import React from 'react'
class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count:0
    }
  }
  render() {
    return <div>
        <p>{this.state.count}</p>
        <button onClick={this.increase}>累加</button>
    </div>
}
increase = () => {
  
 /*  this.setState({
    count:this.state.count+1
  })
  this.setState({
    count:this.state.count+1
  })
  this.setState({
    count:this.state.count+3
  }) */
}
}
export default Demo