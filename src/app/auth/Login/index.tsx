import React, { useEffect } from 'react';
import '../style.sass';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../../redux/type';
import { login, navigateTo } from '../../../redux/actions/app';
import { connect, ConnectedProps } from 'react-redux';
import { Button, Form, Alert, Input } from 'antd';
import { emailRegExp } from '../../../_shared/data/validate';
import { history } from '../../../redux/store';
import PropTypes from 'prop-types';

const propTypes = {
    isLoggingIn: PropTypes.bool,
    login: PropTypes.func.isRequired,
};
const defaultProps = {
    isLoggingIn: false,
};


const stateProps = (state: RootState) => ({
    isLoggingIn: state.ui.loading['login'],
    error: state.ui.errors['login'],
});

const dispatchProps = {
    login,
    navigateTo,
};

const connector = connect(stateProps, dispatchProps);

// Evaluates the props derived from stateProps and dispatchProps
type PropsFromRedux = ConnectedProps<typeof connector>;

type LoginProps = PropsFromRedux & {
    login: any;
    isLoggingIn: boolean;
    error: any;
};

const Login = (props: LoginProps) => {

    const { login, isLoggingIn, error } = props;

    useEffect(() => {
        document.body.scrollTop = 0;
        document.querySelector('.menu')?.classList.remove('open');
    }, []);

    console.log('error:', error);

    const handleSubmit = (values: any) => {
        console.log('values:', values);
        login({...values}, () => {
            history.replace('/app/market');
        });
    };

    const onFinishFailed = (errors: any) => {
        console.log('form-errors:', errors);
    };

    return (
        <div className="loginWrapper">
            <h3 className="loginHeading text-center">Login</h3>
            <div className="btnWrapper">
                    <span className="text-center">
                        {error &&
                            <Alert
                                type="error"
                                message="Incorrect credentials"
                            />
                        }
                    </span>
            </div>
            <Form
                labelCol={{ span: 4 }}
                name="login"
                layout={'vertical'}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
            >
                <div className="inputWrapper">
                    <label htmlFor="email">Email:</label>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            () => ({
                                validator(_, value) {
                                    if (!value || emailRegExp.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Please enter a valid email!');
                                },
                            }),
                        ]}
                    >
                        <Input
                            id="email"
                            className="localAddress"
                            disabled={isLoggingIn}
                            type="email"
                            placeholder="name@example.com"/>
                    </Form.Item>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="password">Password:</label>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        ]}
                    >
                        <Input
                            id="password"
                            disabled={isLoggingIn}
                            className="localAddress"
                            type="password"
                            placeholder="Your Password"/>
                    </Form.Item>
                </div>
                <Form.Item style={{ marginTop: 20 }}>
                    <div className="btnWrapper">
                        <button
                            className="loginBtn authBtn"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? 'Processing...' : 'Login'}
                        </button>
                        <span className="text-center">
                        Don't have account? <NavLink style={{ fontStyle: 'italic' }} to="/sign-up">Sign up</NavLink>
                    </span>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default connector(Login);
