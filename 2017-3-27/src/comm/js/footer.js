import React,{Component}from 'react';
export default class Footer extends Component{
  constructor(props){
    super(props);
    this.changeView = this.changeView.bind(this);
    this.removeData = this.removeData.bind(this);
  }
  
  changeView(ev){
    this.props.changeView(ev.target.dataset.view);
  }
  removeData(){
    this.props.clearData();
  }
  
  
  render(){
    let {num,view,bol} = this.props;
    let clearBtn = null;
    // 有已完成就会显示
    if(bol){
      clearBtn = (<button
          onClick = {this.removeData}
          className="clear-completed">
          清除完成项
      </button>)
    }
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{num}</strong>
          <span>条未选中</span>
        </span>
        <ul className="filters">
          <li>
            <a
              data-view="all"
              href="#/all"
              className={view==='all'?'selected':''}
              onClick={this.changeView}
            >全部</a>
          </li>
          <li>
            <a
              data-view="active"
              onClick={this.changeView}
              href="#/active"
              className={view==='active'?'selected':''}
            >未完成</a>
          </li>
          <li>
            <a
              data-view="completed"
              onClick={this.changeView}
              href="#/completed"
              className={view==='completed'?'selected':''}
            >已完成</a>
          </li>
        </ul>
        {clearBtn}
      </footer>
    )
  }
}
