import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import EventListener, {withOptions} from 'react-event-listener';
import debounce from 'debounce';

import Box from './components/Box';
import SpinLoader from './components/SpinLoader';

import style from './style.less';

const SCROLLTOLERANCE = 150;

class List extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.isAnimating = true;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps){
    let me = this;
    me.isAnimating = nextProps.list.size != this.props.list.size;
  }
  onLikeClickHandler(index, btnStatus){
    let me = this;
    const ac = createAction('color/toggleLike');
    me.props.dispatch(ac({
      ...btnStatus,
      index
    }));
  }

  scrollHandler(st, ev) {
    let me = this;
    let isloading = me.props.loading;
    if(isloading || me.isAnimating){
      return false;
    }

    let elem = ev.target.body;
    let scrollBtn = elem.scrollHeight - elem.clientHeight - elem.scrollTop;
    if(scrollBtn < st){
      let actcr = createAction('color/loadMore');
      me.props.dispatch(actcr());
    }
  };

  getBoxWidth(){
    let me = this;
    let result = 0;
    let w = window.innerWidth;
    if(w >= 1200){
      result = 72;
    }else if(w >= 992){
      result = 80;
    }else if(w >= 768){
      result = 80;
    }else {
      result = 92;
    }
    return result;
  }

  onAnimEnd(endKey, type){
    let me = this;
    if(endKey === type.key){
      if(type.type === 'enter' &&
        (me.props.colorType === 'popular' || me.props.colorType === 'latest')){
        me.isAnimating = false;
      }
    }
  }

  render() {
    let me = this;
    let boxW = me.getBoxWidth();
    let listClass = {},
      im = me.props.isMobile;
    listClass[style.pcPadding] = !im;
    listClass[style.list] = true;
    let clsStr = classnames(listClass);

    let endKey = null;
    if(me.props.list){
      endKey = (me.props.list.size-1).toString();
    }    

    return <div style={{minHeight: 800}}>
      {
        me.props.colorType != 'portfolio' && me.props.colorType != 'like' ?
          <EventListener
            target="window"
            onScroll={debounce(me.scrollHandler.bind(me, SCROLLTOLERANCE))}
            />:
          null
      }

      <QueueAnim type="top"
                 onEnd={me.onAnimEnd.bind(me, endKey)}
                 duration={280}
                 interval={80}
                 className={clsStr}>
        {
          me.props.list.map((v, k) => {
            return (<Col xs={24}
                         sm={24}
                         md={12}
                         lg={12}
                         key={k}
                         className={style.colContainer}>
              <Box detail={v}/>
            </Col>);
          })
        }
      </QueueAnim>
      { me.props.loading ? <SpinLoader /> : <div style={{height: 60}}/> }
    </div>
  }
}

function mapStateToProps({movie}){
  return {
    list: movie.get('list'),
    loading: false
  }
}

export default connect(mapStateToProps)(List);
