//http://codepen.io/dicson/pen/waKPgQ
import React, { PropTypes } from 'react';
import style from '!style-loader!css-loader!less-loader!autoprefixer-loader!./style.less';

const triggerClassName = 'toggle-button';

class MenuButton extends React.Component {
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
    let classStr = 'navTrigger '+ triggerClassName + (me.props.isNavBtnActive ? ' active' : '');
    var result = <div className={classStr}>
      <i/>
      <i/>
      <i/>
    </div>;
    return result;
  }
}

export default MenuButton;
