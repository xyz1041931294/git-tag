import React,{Component}from 'react';
export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      double:false,
      val:''
    }
    this.toggle = this.toggle.bind(this);
    this.deleFn = this.deleFn.bind(this);
    this.doubleFn = this.doubleFn.bind(this);
    this.changeVal = this.changeVal.bind(this);
    this.blurFn = this.blurFn.bind(this);
    this.changTodo = this.changTodo.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  
  //在子组件中调用父组件的切换check方法
  toggle(){
    this.props.toggleCheck(this.props.todo);
  }
  //在子组件中调用父组件的删除方法
  deleFn(){
    this.props.deletFn(this.props.todo);
  }
  //this.setState有第二个参数，这次状态更新完成之后做什么。
  doubleFn(){
    this.setState({
      double:true,
      val:this.props.cont
    },()=>{
      this.refs.change.focus();
    })
  }
  
  changTodo(){
    this.props.todo.cont = this.state.val
    this.props.changTodo(this.props.todo);
  }
  
  keyDown(ev){
    if(ev.keyCode !== 13)return;
    this.blurFn();
  }
  
  blurFn(){
    // alert(1)
    this.setState({
      double:false
    },()=>{
      this.changTodo()
    })
    //更新总的数据
  }
  
  changeVal(){
    this.setState({
      val:this.refs.change.value
    })
    // console.log()
  }
  
  render(){
    let sClass = '';
    /*
      editing是否显示再次编辑框
     */
    //if(this.props.check)sClass+='editing';
    
   sClass = this.props.check?"completed":"";
   console.log(this.state.double)
   if(this.state.double)sClass += ' editing';
    return (
      <li className={sClass}>
          <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={this.props.check}
                onChange={this.toggle}
              />
              <label  onDoubleClick={this.doubleFn}>
                {this.props.cont}
              </label>
              <button className="destroy" onClick={this.deleFn}></button>
          </div>
          <input
            className="edit"
            value={this.state.val}
            onChange = {this.changeVal}
            onBlur = {this.blurFn}
            onKeyDown={this.keyDown}
            ref="change"
          />
      </li>
    )
  }
}
