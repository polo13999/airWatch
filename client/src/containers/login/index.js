import React from 'react'
import { Card, Input, Form, Button } from 'antd'
import PropTypes from 'prop-types'
import { OutterWrap, CenterBlock } from '../../components/wrapPosition'
//import { getUser } from './grapgql'

const FormItem = Form.Item
const page = props => {
  const { form } = props
  const { getFieldDecorator } = form
  const handleSubmit = e => {
    e.preventDefault()
    //console.log('送出')
    form.validateFields(async err => {
      if (!err) {
        // try {
        //   await loginAction.mutation({
        //     variables: values,
        //     refetchQueries: [{ query: getUser }]
        //   })
        // } catch (error) {
        //   message.error(`${Object.values(error)[0][0].message}!!`)
        // }
      }
    })
  }
  return (
    <OutterWrap>
      <CenterBlock className="title-test">
        <Card
          title="空污監測者系統登入"
          style={{
            width: '100%',
            borderRadius: '5px',
            boxShadow: '-2px 7px 46px -2px rgba(0,0,0,0.51)',
            margin: '10px'
          }}
        >
          <Form onSubmit={handleSubmit}>
            <FormItem
              label="帳號"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '請輸入你的帳號' }]
              })(<Input className="input-account" />)}
            </FormItem>
            <FormItem
              label="密碼"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '請輸入你的密碼' }]
              })(<Input className="input-password" type="password" />)}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 5 }}>
              <Button className="login-button" type="primary" htmlType="submit">
                登入空污監測系統
              </Button>
            </FormItem>
          </Form>
        </Card>
      </CenterBlock>
    </OutterWrap>
  )
}

page.propTypes = {
  getFieldDecorator: PropTypes.object || PropTypes.func,
  form: PropTypes.object,
  loginInfo: PropTypes.object
}
export default Form.create()(page)
