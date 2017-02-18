import React from 'react';
import { Tag, Card } from 'antd';
import classnames from 'classnames';

import style from './style.less';

const colors = [
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'green',
  'green',
  'purple'
];
const COLORLENGTH = colors.length;

class StarGroup extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let me = this;
    let list = me.props.list;

    return <Card className={style.container}>
      {
        list.map((v,k) => <Tag color={colors[k % COLORLENGTH]}>{v}</Tag>)
      }
    </Card>
  }
}


export default StarGroup;
