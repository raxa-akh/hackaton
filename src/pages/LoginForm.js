import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { login, fetchCSRFToken } from '../api/authService';
import { Link } from 'react-router-dom';
import cls from "../styles/Login.module.css"

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = await fetchCSRFToken();
            localStorage.setItem('csrfToken', csrfToken);

            const userData = await login({ username, password });

            dispatch(setUser({ user: userData, csrfToken }));
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    };

    return (
        <div className={cls.container}>
            <form className={cls.form} onSubmit={handleSubmit}>
                <span className={cls.title}>Авторизация</span>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    className={cls.input}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className={cls.input}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={cls.button} type="submit">Login</button>

                <div className={cls.options}>
                    <span className={cls.has_acc}>Нет аккаунта?</span>
                    <Link className={cls.create_acc} to={'/register'}>Сделайте</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
