import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import EventListener, {withOptions} from 'react-event-listener';
import debounce from 'debounce';

import Box from './components/Box';

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
  
  onOpen(url){
    let me = this;
    const ac = createAction('movie/open');
    me.props.dispatch(ac({
      url
    }));
  }
  
  onPlay(url){
    let me = this;
    const ac = createAction('movie/play');
    me.props.dispatch(ac({
      url
    }));
  }

  scrollHandler(st, ev) {
    let me = this;

    if(me.props.loading || me.isAnimating || me.props.type){
      return false;
    }

    let elem = ev.target.body;
    let scrollBtn = elem.scrollHeight - elem.clientHeight - elem.scrollTop;
    if(scrollBtn < st){
      let actcr = createAction('movie/loadmore');
      me.props.dispatch(actcr());
    }
  };

  onAnimEnd(endKey, type){
    let me = this;
    if(endKey === type.key){
      me.isAnimating = false;
    }
  }

  render() {
    let me = this;
    let listClass = {};
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
              <Box
                onOpen={me.onOpen.bind(me)}
                onPlay={me.onPlay.bind(me)}
                detail={v}/>
            </Col>);
          })
        }
      </QueueAnim>
    </div>
  }
}

function mapStateToProps({movie}){
  return {
    list: movie.get('list'),
    loading: movie.get('loading'),
    type: movie.get('type')
  }
}

export default connect(mapStateToProps)(List);
