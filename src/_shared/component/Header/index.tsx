import  {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import authService from '../../../services/auth';

const Header = () => {

    const [previous] = useState(0);
    const [authStatus] = useState(authService.isLoggedIn());
    const [menuActive, setMenuActive] = useState(false);
    const [menuButton] = useState(
        <button className="menuBtn"
                onClick={() => {
                    document.querySelector('.menu')?.classList.toggle('open')
                }}>
            Menu
        </button>
    );
    const [headerMenu, setHeaderMenu] = useState(
        <div className="menu loginMenu">
            <NavLink to="/login" activeClassName="activeNavLink" className="navLink">
                Login / Sign up
            </NavLink>
        </div>
    );
    const [previousWidth, setPreviousWidth] = useState(0);

    useEffect(() => {
        setPreviousWidth(window.innerWidth);
        window.addEventListener('resize', () => {
            setMenu(window.innerWidth);
        })
    }, []);



    useEffect(() => {
        console.log('authStatus:', authStatus);
        if (authStatus) {
            setHeaderMenu(
                <div className="menu">
                    <NavLink to="/" exact={true} key={1} activeClassName="activeNavLink" className="navLink">
                        Home
                    </NavLink>
                    <NavLink to="/profile" exact={true} key={2} activeClassName="activeNavLink" className="navLink">
                        Profile
                    </NavLink>
                    <NavLink to="/market" exact={true} key={3} activeClassName="activeNavLink" className="navLink">
                        Market
                    </NavLink>
                </div>
            )
        }
    },[])

    const setMenu = (width: number) => {
        if (previous !== width) {
            if (width > 768) {
                const menu = document.querySelector('div.menu');
                if (menu) {
                    menu.classList?.remove('open');
                }
                setMenuActive(false);
            } else {
                setMenuActive(true);
            }
        }
        setPreviousWidth(width);
    };


    const [loggedOutMenu, setLoggedOutMenu] = useState(
        <div className="menu loginMenu">
            <NavLink to="/login" activeClassName="activeNavLink" className="navLink">
                Login / Sign up
            </NavLink>
        </div>
    );


    const [loggedInMenu, setLoginMenu] = useState(
        <div className="menu">
            <NavLink to="/app/market" exact={true} key={3} activeClassName="activeNavLink" className="navLink">
                Market
            </NavLink>
            <NavLink to="/app/products/add" exact={true} key={3} activeClassName="activeNavLink" className="navLink">
                Add Product
            </NavLink>
            <NavLink to="/login" exact={true} key={3} activeClassName="activeNavLink" className="navLink">
                Sign out
            </NavLink>
        </div>
    );

    return (
        <header className="header">
            <h1>
                <NavLink to="/" exact={true} className="logo">
                    Market
                </NavLink>
            </h1>
            {menuActive ? menuButton : ""}
            {/*{headerMenu}*/}
            {loggedInMenu}
            {/*{authStatus ? loggedInMenu : loggedOutMenu }*/}
        </header>
    )
};

export default Header;
