import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Dropdown } from 'antd';

import MenuButton from './components/MenuButton';

import { Link } from 'react-router';
import style from './style.less';


const HeaderCenter = ({isNavBtnActive}) => {


  return <header className={style.header}>
    <Row>

      <Col lg={20} md={19} sm={18} xs={24} className={style.leftHeaderContainer}>

        <MenuButton isNavBtnActive={isNavBtnActive}/>
        &nbsp;&nbsp;&nbsp;
        <Button type="default" icon="home">
            click here
        </Button>
      </Col>

      <Col lg={4} md={5} sm={6} xs={0}>
      </Col>

    </Row>
  </header>;
};

export default HeaderCenter;
