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
    return <Card
      title={me.props.detail.get('c') + '-' + me.props.detail.get('i')}
      className={style.box}
    >
      <img src={me.props.detail.get('im')} alt="no image"/>
    </Card>;
  }
}

export default Box;