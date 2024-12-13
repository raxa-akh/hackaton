import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { setUser } from './redux/slices/authSlice';
import "./App.css";
import LoginForm from './pages/LoginForm';
import MainPage from './pages/MainPage';
import Dashboard from './pages/Dashboard';
import Raiting from './pages/Raiting';
import RegisterForm from './pages/RegisterForm';
import Analitycs from './pages/Analitycs';

const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const csrfToken = localStorage.getItem('csrfToken');

        if (storedUser && csrfToken) {
            dispatch(setUser({ user: JSON.parse(storedUser), csrfToken }));
        }
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/mainPage" replace />
                        ) : (
                            <LoginForm />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/mainPage" replace />
                        ) : (
                            <RegisterForm />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/analitycs"
                    element={
                        isAuthenticated ? (
                            <Analitycs />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/raiting"
                    element={
                        isAuthenticated ? (
                            <Raiting/>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/mainPage"
                    element={
                        isAuthenticated ? (
                            <MainPage/>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};
export default App;