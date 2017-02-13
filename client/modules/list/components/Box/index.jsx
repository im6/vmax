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
      <Button type="primary">Open</Button>
      <Button type="primary">Open</Button>
      <Button type="primary">Open</Button>
    </Card>;
  }
}

export default Box;