import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon } from 'antd'
import Menu from './menu'
const { Header, Sider, Content } = Layout

const LayoutTemplate = props => {
  const { children } = props
  const [state, setState] = useState({ collapsed: true })
  // console.log('children', children)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <Menu />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => setState({ collapsed: !state.collapsed })}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

LayoutTemplate.propTypes = {
  children: PropTypes.object
}
export default LayoutTemplate
