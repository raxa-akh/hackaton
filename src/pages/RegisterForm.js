import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { registerAdmin, fetchCSRFToken } from '../api/authService';
import cls from "../styles/Login.module.css"
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = await fetchCSRFToken();
            localStorage.setItem('csrfToken', csrfToken);

            const newAdmin = await registerAdmin({ username, password, email });

            dispatch(setUser({ user: newAdmin, csrfToken }));
            localStorage.setItem('user', JSON.stringify(newAdmin));
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    return (
        <div className={cls.container}>
            <form className={cls.form} onSubmit={handleSubmit}>
                <span className={cls.title}>Регитсрация</span>
                <input
                    className={cls.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className={cls.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className={cls.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={cls.button} type="submit">Register</button>
                <div className={cls.options}>
                    <span>Already have an account? </span>
                    <Link to={"/login"}>Login</Link>
                </div>
            </form>
        </div>        
    );
};

export default RegisterForm;
