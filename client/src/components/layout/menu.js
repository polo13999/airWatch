import React from 'react'
import { Menu, Icon } from 'antd'

const menuTemplate = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Icon type="user" />
        <span>空汙論壇</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="video-camera" />
        <span>空汙監測</span>
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="solution" />
        <span>空污事件</span>
      </Menu.Item>
      <Menu.Item key="4">
        <Icon type="upload" />
        <span>舉報空污</span>
      </Menu.Item>
      <Menu.Item key="5">
        <Icon type="team" />
        <span>捍衛家園</span>
      </Menu.Item>
      <Menu.Item key="6">
        <Icon type="dislike" />
        <span>監督機關人員</span>
      </Menu.Item>
    </Menu>
  )
}

export default menuTemplate
