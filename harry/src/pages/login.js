import React from 'react'
import {connect} from 'react-redux'
import {Grid, Segment, Form} from 'semantic-ui-react'

import './login.css'
import {actions} from '../actions/auth'


function LoginPage({username, password, fieldChangeHandler, loginClicked}) {
    return (
        <Grid className="LoginPage" centered verticalAlign='middle'>
            <Grid.Column className="LoginPage__column">
                <Segment className='LoginPage__form'>
                    <Form>
                        <Form.Input
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            value={username}
                            onChange={fieldChangeHandler('username')}
                        />
                        <Form.Input
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={fieldChangeHandler('password')}
                        />
                        <Form.Button
                            fluid
                            color='blue'
                            onClick={(e) => {
                                e.preventDefault()
                                loginClicked(username, password)
                            }}
                        >
                            Login
                        </Form.Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

function mapStateToProps(state) {
    return {
        username: state.auth.username,
        password: state.auth.password,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fieldChangeHandler: field => e => dispatch(actions.fieldChanged(field, e.target.value)),
        loginClicked: (username, password) => dispatch(actions.login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
