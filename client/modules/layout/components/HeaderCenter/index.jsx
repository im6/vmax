import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Spin } from 'antd';

import MenuButton from './components/MenuButton';

import { Link } from 'react-router';
import style from './style.less';


const HeaderCenter = ({isNavBtnActive, onRefresh, 
  onReturn,
  onDup, 
  isLoading, 
  viewType
}) => {

  return <header className={style.header}>
    <Row>

      <Col lg={20} md={19} sm={18} xs={24} className={style.leftHeaderContainer}>

        <MenuButton isNavBtnActive={isNavBtnActive}/>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button 
          onClick={onRefresh}
          type={isLoading? 'default': 'primary'}>          
          {isLoading ? <Spin spinning={isLoading}/> : 'Refresh'} 
        </Button>
        &nbsp;&nbsp;
        {
          viewType === 'dup' ?
            <Button
              onClick={onReturn}
              icon="arrow-left"
              type={'default'}>
              Return
            </Button> :
            <Button
              onClick={onDup}
              type={'default'}>
              Check Dup
            </Button>
        }

      </Col>

      <Col lg={4} md={5} sm={6} xs={0}/>
    </Row>
  </header>;
};

export default HeaderCenter;
