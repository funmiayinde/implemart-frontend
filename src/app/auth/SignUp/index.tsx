import React, { useEffect, useState } from 'react';
import '../style.sass';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Button, Form, Input } from 'antd';
import { emailRegExp } from '../../../_shared/data/validate';
import { RootState } from '../../../redux/type';
import { navigateTo, signUp } from '../../../redux/actions/app';
import { connect, ConnectedProps } from 'react-redux';
import { history } from '../../../redux/store';
import LocationInputField from '../../../_shared/component/LocationInputField';
import AutoCompletePlace from '../../../_shared/component/AutoCompleteSearch';

const propTypes = {
    isLoggingIn: PropTypes.bool,
    signUp: PropTypes.func.isRequired,
};
const defaultProps = {
    isLoggingIn: false,
};


const stateProps = (state: RootState) => ({
    isLoggingIn: state.ui.loading['login'],
    error: state.ui.errors['login'],
});

const dispatchProps = {
    signUp,
    navigateTo,
};

const connector = connect(stateProps, dispatchProps);

// Evaluates the props derived from stateProps and dispatchProps
type PropsFromRedux = ConnectedProps<typeof connector>;

type SignUpProps = PropsFromRedux & {
    signUp: any;
    isLoggingIn: boolean;
    error: any;
};


const SignUp = (props: SignUpProps) => {

    useEffect(() => {
        document.body.scrollTop = 0;
        document.querySelector('.menu')?.classList.remove('open');
    }, []);

    const { signUp, isLoggingIn, error } = props;
    const [location, setLocation] = useState(null);

    const handleSubmit = (values: any) => {
        console.log('values:', { values, location });
        const { geometry: { coordinates }, context, place_name }: any = location || {};
        const payload = {
            ...values,
            location: { coordinates, city: context[0]['text'], street: place_name },
        };
        console.log('payload:', { ...payload });
        signUp({ ...payload }, () => {
            history.replace('/app/market');
        });
    };

    const handleOnSelect = (place: any) => {
        console.log('place:', place);
        setLocation(place);
    };

    return (
        <Form
            labelCol={{ span: 4 }}
            name="login"
            className="loginWrapper"
            layout={'vertical'}
            onFinish={handleSubmit}
        >

            <div className="loginWrapper">
                <h3 className="loginHeading text-center">Sign Up</h3>
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
                <div className="inputWrapper">
                    <label htmlFor="email">First name:</label>
                    <Form.Item
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input
                            className="localAddress"
                            type="text"
                            placeholder="Joe"/>
                    </Form.Item>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="email">Last name:</label>
                    <Form.Item
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input
                            className="localAddress"
                            type="text"
                            placeholder="Doe"/>
                    </Form.Item>
                </div>
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
                            type="email"
                            placeholder="name@emample.com"/>
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
                        <Input.Password
                            id="password"
                            name="password"
                            className="localAddress"
                            type="password"
                            placeholder="Your Password"/>
                    </Form.Item>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="password">Location:</label>
                    <AutoCompletePlace
                        onSelect={handleOnSelect}
                        className="localAddress"
                        placeHolder="Your Location"/>
                </div>
                <div className="btnWrapper">
                    <button
                        className="loginBtn authBtn"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? 'Processing...' : 'Sign Up'}
                    </button>
                    <span className="text-center">
                        Already have account? <NavLink style={{ fontStyle: 'italic' }} to="/login">Login</NavLink>
                    </span>
                </div>

            </div>
        </Form>
    );
};

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default connector(SignUp);
