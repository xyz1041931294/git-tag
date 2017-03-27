import React,{Component}from 'react';
import ReactDOM from 'react-dom';
require('./comm/css/base.css');
require('./comm/css/index.css');

import Main from './comm/js/Main.js';
import Footer from './comm/js/footer.js';

let data = {
  arr:[]
}

class App extends Component{
  //如果数据为传进来的，那么在初始化状态的时候，super中要传入props
  //这样才能在constructor中拿到传进来的数据。
  constructor(props){
    super(props);
    this.state = {
      arr:this.props.arr,
      val:'',
      view:'all'
    }
    
    this.changeVal = this.changeVal.bind(this);
    this.DownFn = this.DownFn.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.deletFn = this.deletFn.bind(this);
    this.allFn = this.allFn.bind(this);
    this.changeView = this.changeView.bind(this);
    this.clearData = this.clearData.bind(this);
    this.changTodo = this.changTodo.bind(this);
  }
  
  changeVal(ev){
    this.setState({
      val:ev.target.value
    })
  }
  //回车
  DownFn(ev){
    let val = ev.target.value.trim();
    if(ev.keyCode !== 13 || !val)return;
    //创建一个对象，为了一会添加到state.arr中
    let newData = {
      id:new Date().getTime(),
      cont:val,
      check:false
    }
    let newArr = Object.assign([],this.state.arr);
    //当添加完数据之后，更新状态，渲染页面。
    newArr.unshift(newData);
    this.setState({
      arr:newArr,
      val:''
    })
  }
  //点击是否为选中状态，todo为点击的那个数据
  toggleCheck(todo){
    let newArr = Object.assign([],this.state.arr);
    // console.log(newArr[0])
    let datas = newArr.map((ele)=>{
      //如果点击的checkbox数据的id与总数据的id一致，将checked状态取反改变
      if(ele.id == todo.id){
        ele.check = !ele.check
      }
      return ele;
    })
    //更新状态，渲染页面。
    this.setState({
      arr:datas
    })
  }
  
  //删除
  deletFn(todo){
    let newArr = Object.assign([],this.state.arr);
    /*
      filter:筛选数据，如果返回值为true就保留，为false就删除
      [1,2,3,4]
      return if(1 != 1) false  删除 1 这个数据
      return if(1 != 2) true   保留这个数据
     */
    let datas = newArr.filter((ele)=>{
      return ele.id != todo.id
    })
    
    this.setState({
      arr:datas
    })
  }
  
  changTodo(todo){
    let newArr = Object.assign([],this.state.arr);
    newArr = newArr.map((ele,i)=>{
      if(ele.id ===  todo.id){
        ele.cont = todo.cont
      }
      return ele;
    })
    this.setState({
      arr:newArr
    })
  }
  
  allFn(ev){
    let {checked} = ev.target;
    let newArr = Object.assign([],this.state.arr);
    let arr = newArr.map((ele)=>{
      ele.check = checked;
      return ele;
    })
    this.setState({
      arr:arr
    })
    // console.log(checked)
  }
  
  changeView(view){
    this.setState({
      view:view
    })
  }
  
  //清除所有选项
  clearData(){
    let newArr = Object.assign([],this.state.arr);
    let datas = newArr.filter((ele)=>{
      return !ele.check
    })
    this.setState({
      arr:datas
    })
  }
  
  
  
    
  render(){
    //let newArr = Object.assign([],this.state.arr);
    
    let {arr:newArr,view} = this.state;
    let num = newArr.length;
    let footer = null;
    let listBox = null;
    let list = null;
    
    if(newArr.length){
        let listShai = newArr.filter((ele,i)=>{
          if(ele.check)num--;
          switch(view){
            //未完成
            case 'active':
              return !ele.check;
            break;
            //已完成
            case 'completed':
              return ele.check;
            break;
            default:
              return true;
            break;
          }
        })
      list = listShai.map((ele,i)=>{
        let datas = {
          //数据的id
          id:ele.id,
          //数据的内容
          cont:ele.cont,
          //数据的勾选的状态
          check:ele.check,
          //为了不报错
          key:ele.id,
          //一个组件对应一个它的数据
          todo:ele,
          //切换的需要回调函数（让子组件去调用），操作子组件，将最新的状态发送给父组件，
          //父组件通过改变的数据来控制是否渲染页面
          toggleCheck:this.toggleCheck,
          //把父级的删除函数传给子组件，让子组件去调用
          deletFn:this.deletFn,
          changTodo:this.changTodo
        }
        //把每个组件都赋值给list
        return <Main {...datas}/>
      })
    }
    
    //如果有数据才显示footer和main
    if(newArr.length){
      let footerDate = {
        num:num,
        changeView:this.changeView,
        view:view,
        bol:(newArr.length != num),
        clearData:this.clearData
      }
      footer = (<Footer {...footerDate}/>)
      
      listBox = (
        <section className="main">
            <input
              className="toggle-all"
              type="checkbox"
              //只有在num为0的时候，说明全选中
              checked={(num === 0) && newArr.length}
              onChange = {this.allFn}
            />
            <ul className="todo-list">
            {list}
            </ul>
        </section>)
    }
    

    return (
      <div>
        <header className="header" >
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="请输入内容"
              //通过全局的val状态来控制的
              value = {this.state.val}
              //通过onChange事件来更改数据，实现val更新
              onChange = {this.changeVal}
              //回车的时候触发这个事件
              onKeyDown = {this.DownFn}
            />
        </header>
        {listBox}
        {footer}
      </div>
    )
  }
}

ReactDOM.render(
  <App {...data}/>,
  document.getElementById('box')
)
