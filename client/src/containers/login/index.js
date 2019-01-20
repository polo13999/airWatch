import React, { useContext } from 'react'
import { Card, Input, Form, Button } from 'antd'
import PropTypes from 'prop-types'
import { OutterWrap, CenterBlock } from '../../components/wrapPosition'
import { getUser, login } from './grapgql'
import { Mutation } from 'react-apollo'
import { GlobalCtx } from '../../../pages/_app'

const FormItem = Form.Item
const page = props => {
  const context = useContext(GlobalCtx)

  const { form, setState } = props
  const { getFieldDecorator } = form

  return (
    <Mutation mutation={login}>
      {(login, { data }) => {
        const handleSubmit = e => {
          e.preventDefault()
          //console.log('送出')
          form.validateFields(async (err, values) => {
            if (!err) {
              console.log(
                '              context.userLogin              ',
                context.userLogin
              )
              login({ variables: values, refetchQueries: [{ query: getUser }] })
              setState({ login: data })
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
                    <Button
                      className="login-button"
                      type="primary"
                      htmlType="submit"
                    >
                      登入空污監測系統
                    </Button>
                  </FormItem>
                </Form>
              </Card>
            </CenterBlock>
          </OutterWrap>
        )
      }}
    </Mutation>
  )
}

page.propTypes = {
  getFieldDecorator: PropTypes.object || PropTypes.func,
  form: PropTypes.object,
  loginInfo: PropTypes.object,
  setState: PropTypes.func
}
export default Form.create()(page)
