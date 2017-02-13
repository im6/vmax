import React from 'react';
import { Card, Button, Icon } from 'antd';
import style from './style.less';

class Box extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }
  
  onPlay(url){
    let me = this;
    me.props.onPlay(url);
  }
  onOpen(url){
    let me = this;
    me.props.onOpen(url);
  }

  shouldComponentUpdate(nextProps, nextState){
    let me = this;
    return true;
  }

  render() {
    let me = this;
    
    let imgName = me.props.detail.getIn(['im', '0']);
    let imgUrl = imgName ? '/resource' + me.props.detail.get('r') + '/' + imgName : null;

    return <Card
      title={<h3>{me.props.detail.get('c') + '-' + me.props.detail.get('i')}</h3>}
      className={style.box}
    >
      {
        imgUrl ? <div className={style.imageContainer}>
          <img src={imgUrl} alt="no image"/>
        </div> : <div className={style.imgHolder}></div>
      }
      <br/>
      {
        me.props.detail.get('m').map((v, k) => {
          return <Button
            key={k}
            style={{marginRight: 8}}
            onClick={me.onPlay.bind(me, me.props.detail.get('r') + '/' + v)}
            icon="caret-right"
            type="primary">
            Play ({k})
          </Button>
        })
      }
      
      &nbsp;&nbsp;
      <Button
        onClick={me.onOpen.bind(me, me.props.detail.get('r'))}
        icon="arrows-alt"
        type="default">
        View
      </Button>
    </Card>;
  }
}

export default Box;