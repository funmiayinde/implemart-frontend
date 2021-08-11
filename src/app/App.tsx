import React, {Suspense, lazy} from 'react';
import './App.scss';
import '../../node_modules/antd/dist/antd.css';
import {Redirect, Switch} from "react-router-dom";
import {ScaleLoader} from "react-spinners";
import Route from '../_shared/component/Route';
import Header from "../_shared/component/Header";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Footer from "../_shared/component/Footer";
import PropTypes from 'prop-types';

export const Loading = () => (
    <div
        className="text-center justify-content-center wh-100"
        style={{
            width: '100vw',
            height: '100vh',
            background: 'var(--background-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <ScaleLoader loading={true} color={'var(--accent-color)'}/>
    </div>
);

type AppProps = {
    location: {
        pathname: ''
    };
    children?: React.ReactChildren,
};

const defaultProps = {
    location: {
        pathname: '',
    },
};
const propsTypes = {
    location: PropTypes.object,
};

const Login = lazy(() => import('./auth/Login'));
const SignUp = lazy(() => import('./auth/SignUp'));
const Layout = lazy(() => import('./layout'));
const Market = lazy(() => import('../modules/App/Market/lib'));
const ProductDetails = lazy(() => import('../modules/App/Market/lib/Detail'));
const AddProduct = lazy(() => import('../modules/App/Market/lib/Add'));

const App = (props: AppProps) => {
    return (
        <div className="wrapper">
            <Header/>
            <ReactCSSTransitionGroup
                transitionName="content"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <div key={props.location.pathname}>
                    <Suspense fallback={<Loading/>}>
                        <Switch>
                            <Route exact path="/login" name="Login" component={Login}/>
                            <Route exact path="/sign-up" name="Sign Up" component={SignUp}/>
                            {/*<Route exact path="/:module" name="App" component={Layout}/>*/}
                            <Route exact path="/app/market" name="App" component={Market}/>
                            <Route exact path="/app/products/details/:id" name="App" component={ProductDetails}/>
                            <Route exact path="/app/products/add" name="App" component={AddProduct}/>
                        </Switch>
                    </Suspense>
                    <div>
                        <Footer/>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        </div>
    );
};

App.propTypes = propsTypes;
App.defaultProps = defaultProps;

export default App;
