
import { useState } from 'react';
import DeliveryCard from '../components/DeliveryCard/DeliveryCard';
import Header from '../components/HeaderComponent/Header';
import cls from "../styles/Dashboard.module.css"
import style from '../modal/modalOptions.module.css'


const Dashboard = () => {

    const [selectedLoader, setSelectLoader] = useState([])
    const [click, setClick] = useState(false)
    
    const deliveries = [
        {
            id: 1,
            date: '2024-12-01',
            quantity: 50,
            loaderName: 'Иван Петров',
            isCompleted: 'true'
        },
        {
            id: 2,
            date: '2024-12-02',
            quantity: 30,
            loaderName: 'Сергей Смирнов',
            isCompleted: 'false'
        },
        {
            id: 3,
            date: '2024-12-03',
            quantity: 20,
            loaderName: 'Анна Кузнецова',
            isCompleted: 'true'
        },
        {
            id: 4,
            date: '2024-12-04',
            quantity: 15,
            loaderName: 'Дмитрий Иванов',
            isCompleted: 'false'
        },
        {
            id: 5,
            date: '2024-12-05',
            quantity: 40,
            loaderName: 'Елена Васильева',
            isCompleted: 'true'
        }
    ];

    const addLoader = (elem) => {
        setSelectLoader(prev => [...prev, { id: elem.id, loaderName: elem.loaderName }])
    }
    const removeLoader = (id) => {
        setSelectLoader(prev => prev.filter(item => item.id !== id))
    }
    
    return (
        <div>
            <Header/>

            <main className={cls.main} >
                <div className={cls.container}>
                <h2>Таблица поставок</h2>
            <table id="deliveriesTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата</th>
                        <th>Количество товаров</th>
                        <th>Имя грузчика</th>
                        <th>Завершена поставка</th>
                        <th onClick={() => setClick(!click)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-menu"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedLoader.map((elem) => {
                            return <DeliveryCard key={elem.id} deliveryData={elem} />
                        })
                    }
                </tbody>
            </table>
            </div>
            </main>

            {click === true ? <div className={style.modalOptions}>
                {
                    deliveries.map((elem) => {
                        return <p key={elem.id}>
                        {elem.id} {elem.loaderName}
                        {selectedLoader.some(selectedItem => selectedItem.id === elem.id) ? (
                            <button onClick={() => removeLoader(elem.id)}>удалить <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-delete"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg></button>
                        ) : (
                            <button onClick={() => addLoader({ id: elem.id, loaderName: elem.loaderName })}>добавить <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg></button>
                        )}
                    </p>
                    })
                }
            </div> : null}

        </div>
    );
};

export default Dashboard;
