import React from 'react'
import styled from 'styled-components'
import { Card, Input, Form, Button, message } from 'antd'
import PropTypes from 'prop-types'

import { getUser } from './grapgql'

const FormItem = Form.Item

const WrapCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url('/static/img/bg.jpg');
  background-size: cover;
`
const LoginBlock = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const Login = props => {
  const { loginAction } = props
  const { getFieldDecorator } = props.form

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          //console.log('loginInfo', loginInfo)
          await loginAction.mutation({
            variables: values,
            refetchQueries: [
              {
                query: getUser
              }
            ]
          })
        } catch (error) {
          //  console.log('Object.values(error)', Object.values(error))
          message.error(`${Object.values(error)[0][0].message}!!`)
        }
      }
    })
  }

  return (
    <WrapCenter>
      <LoginBlock className="title-test">
        <Card
          title="公司 ERP 系統登入"
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
                登入系統
              </Button>
            </FormItem>
          </Form>
        </Card>
      </LoginBlock>
    </WrapCenter>
  )
}

Login.propTypes = {
  form: PropTypes.object || PropTypes.func,
  loginAction: PropTypes.object,
  loginInfo: PropTypes.object
}

export default Form.create()(Login)
