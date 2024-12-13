import cls from "./Header.module.css"
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../redux/slices/authSlice';
import { logout } from '../../api/authService';
import logo from "../../assets/logo.png"

function Header() {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(logoutAction());
            localStorage.removeItem('user');
            localStorage.removeItem('csrfToken');
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    };

    return(
        <header className={cls.header}>
            <div className={cls.container}>
                <nav className={cls.nav}>
                    <Link to={'/mainPage'}><div className={cls.nav_logo}><img alt="" src={logo} />MedChain</div></Link>
                    <div className={cls.nav_links}>
                        <Link to={'/raiting'} className={cls.nav_link}>Склады</Link>
                        <Link to={'/dashboard'} className={cls.nav_link}>Поставки</Link>
                        <Link to={'/analitycs'} className={cls.nav_link}>Аналитика</Link>
                        <button onClick={() => handleLogout()} className={  cls.nav_btn}>Выйти</button>
                    </div>
                </nav>
            </div>
        </header>  
    )   
}

export default Header;