import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Spin, Input, Select } from 'antd';
const Search = Input.Search;
const Option = Select.Option;
import MenuButton from './components/MenuButton';

import { Link } from 'react-router';
import style from './style.less';


const HeaderCenter = ({
  isNavBtnActive,
  onRefresh,
  onReturn,
  onDup, 
  onSearch,
  isLoading, 
  onImgPair,
  viewType,
  onLayoutChange,
  onProgressChange
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
        <Button
          onClick={onImgPair}
          type="default"
          icon="picture"
        />
        
        &nbsp;&nbsp;
        {
          viewType ?
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

        &nbsp;&nbsp;&nbsp;&nbsp;
        <Search
          placeholder="search movie"
          style={{ width: 400 }}
          size="large"
          onSearch={onSearch}
        />
        &nbsp;
        &nbsp;
        
        <Select defaultValue="2" 
                size="large"
                style={{ width: 50 }} onChange={onLayoutChange}>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
        
        &nbsp;
        &nbsp;
        
        <Select defaultValue="0" 
                size="large"
                style={{ width: 80 }} onChange={onProgressChange}>
          <Option value="0">0%</Option>
          <Option value="1">10%</Option>
          <Option value="2">20%</Option>
          <Option value="3">30%</Option>
          <Option value="4">40%</Option>
          <Option value="5">50%</Option>
          <Option value="6">60%</Option>
          <Option value="7">70%</Option>
          <Option value="8">80%</Option>
          <Option value="9">90%</Option>
        </Select>

      </Col>

      <Col lg={4} md={5} sm={6} xs={0}/>
    </Row>
  </header>;
};

export default HeaderCenter;
