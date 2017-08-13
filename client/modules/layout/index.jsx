import React, { PropTypes } from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Slideout from 'slideout';
import { Global } from '../../config/global.js';
import EventListener, {withOptions} from 'react-event-listener';

import styles from './style.less';
import '!style-loader!css-loader!./slideout.css';

import img from '!file-loader!./assets/gradient.jpg';

import HeaderCenter from './components/HeaderCenter';
import SlideoutMenu from './components/SlideoutMenu';


let slideout = null;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      isMenuView: false
    };
  }

  componentDidMount() {
    let me = this;
    me.initSlideout();
  }

  componentWillUnmount() {
  }

  initSlideout(){
    let me = this;
    let { panel, menu } = me.refs;
    slideout = new Slideout({
      'panel': panel,
      'menu': menu,
      'padding': 230,
      'tolerance': 70,
      'touch': false
    });
    document.querySelector('.toggle-button').addEventListener('click', function() {
      slideout.toggle();
    });
    slideout.on('open', () => {
      me.setState({
        isMenuView: true
      });
    });
    slideout.on('close', () => {
      me.setState({
        isMenuView: false
      });
    });
  }

  onSlideoutMenuClick(selection){
    let me = this;
    if(!Global.isDev){
      setTimeout(()=>{
        slideout.close();
      }, 500);
    }
  }


  resizeHandler(ev) {
    let me = this;
  };
  
  onRefresh(){
    let me = this;
    const ac = createAction('movie/refresh');
    me.props.dispatch(ac());
  }
  onDup(){
    let me = this;
    const ac = createAction('movie/dup');
    me.props.dispatch(ac());
  }
  onReturn(){
    let me = this;
    const ac = createAction('movie/return');
    me.props.dispatch(ac());
  }
  onSearch(r){
    let me = this;
    const ac = createAction('movie/search');
    me.props.dispatch(ac({
      keyword:r
    }));
    
  }
  onImgPair(){
    let me = this;
    const ac = createAction('movie/imgpair');
    me.props.dispatch(ac());
  }
  onLayoutChange(a){
    const me = this;
    const ac = createAction('movie/changeLayout');
    me.props.dispatch(ac(a));
  }
  onProgressChange(a){
    const me = this;
    const ac = createAction('movie/jumpTo');
    me.props.dispatch(ac(parseInt(a)/10));
  }

  render() {
    let me = this;
    var result = <div className={styles.layoutBox} >
      <EventListener
        target="window"
        onResize={me.resizeHandler.bind(me)}
        />

      <nav ref="menu">
        <SlideoutMenu onClick={me.onSlideoutMenuClick.bind(me)}/>
      </nav>

      <main ref="panel">
        <HeaderCenter
          onRefresh={me.onRefresh.bind(me)}
          onDup={me.onDup.bind(me)}
          isNavBtnActive={me.state.isMenuView}
          isLoading={me.props.isLoading}
          viewType={me.props.viewType}
          onReturn={me.onReturn.bind(me)}
          onSearch={me.onSearch.bind(me)}
          onImgPair={me.onImgPair.bind(me)}
          onLayoutChange={me.onLayoutChange.bind(me)}
          onProgressChange={me.onProgressChange.bind(me)}
        />
        <div
          className={styles.main}
          style={{
          background: `#f5f6f7 url(${img}) repeat-x 0 0`,
          minHeight: document.body.clientHeight
          }} >
          {me.props.children}
        </div>
      </main>

    </div>;

    return result;
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

function mapStateToProps({routing, movie}){
  return {
    isLoading: movie.get('loading'),
    viewType: movie.get('type'),
    currentPath: routing.locationBeforeTransitions.pathname
  }
}

export default connect(mapStateToProps)(Layout);
