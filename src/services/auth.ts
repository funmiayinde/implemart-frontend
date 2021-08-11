import jwtDecode from 'jwt-decode';
import store from '../redux/store';

class AuthService {
    constructor() {

    }

    getUserSession() {
        const {getState} = store;
        const {app} = getState();
        return app.session;
    }

    isLoggedIn(): boolean {
        const token = this.getUserSession();
        console.log('token:', token);
        if (token) {
            try {
                const decoded: any = jwtDecode<any>(token);
                const sessionTimeExp = decoded.exp;
                console.log('session:', sessionTimeExp > new Date().getTime() / 1000);
                return sessionTimeExp > new Date().getTime() / 1000;
            } catch (e) {
                return false;
            }
        }
        return false;
    }
}


export default new AuthService();
