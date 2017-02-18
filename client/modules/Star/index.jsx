import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';

import Box from '../list/components/Box';
import StarGroup from './components/StarGroup'

import style from './style.less';


class Star extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
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
      <Row>
        <Col lg={24}>
          <StarGroup list={me.props.name} />
        </Col>
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
      </Row>
      
      
    </div>
  }
}

function mapStateToProps({star}){
  return {
    name: star.get('name'),
    list: []
    
  }
}

export default connect(mapStateToProps)(Star);
