import { Button, Icon } from 'antd'
import React from 'react'
import Proptypes from 'prop-types'
const headerBlock = props => {
  const { children } = props
  return (
    <div>
      {children}
      <Icon
        type="bell"
        style={{ position: 'absolute', right: '60px', marginTop: '14px' }}
      />
      <Button
        shape="circle"
        icon="user"
        style={{ position: 'absolute', right: '10px', margin: '5px' }}
      />
    </div>
  )
}

headerBlock.propTypes = {
  children: Proptypes.object
}

export default headerBlock
