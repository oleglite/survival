import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import store from '../../core/store';
import Layout from '../../components/Layout';
import LoginForm from '../../components/auth/LoginForm'
import {authFieldChanged, login} from '../../core/actions/auth'


class LoginPage extends React.Component {
    render () {
        const {dispatch, auth} = this.props
        return (
            <Layout>
                <LoginForm
                    fields={auth.fields}
                    onChange={(field, value) => dispatch(authFieldChanged(field, value))}
                    onLogin={() => dispatch(login(auth.fields.username, auth.fields.password))}
                />
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(LoginPage)
