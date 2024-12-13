import axios from 'axios';

// Настраиваем Axios
const api = axios.create({
    baseURL: 'https://eggvand.pythonanywhere.com/',
    withCredentials: true, // Учитываем CORS
});

// Интерсептор для CSRF-токенов
api.interceptors.request.use(async (config) => {
    const csrfToken = localStorage.getItem('csrfToken');
    if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    return config;
});

export const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
};

export const fetchCSRFToken = async () => {
    const response = await api.get('/csrf-token');
    return response.data.csrfToken;
};

export const logout = async () => {
    await api.post('/logout');
};

export const goods = async () => {
    try{  
        await api.get('/cargo');
    }catch(e){
        console.log(e)
    }
};

export const registerAdmin = async (registrationData) => {
    const response = await api.post('/register', registrationData);
    return response.data;
};