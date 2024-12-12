
import DeliveryCard from '../components/DeliveryCard/DeliveryCard';
import Header from '../components/HeaderComponent/Header';
import cls from "../styles/Dashboard.module.css"



const Dashboard = () => {
    
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
    
    return (
        <div>
            <Header/>

            <h2>Таблица поставок</h2>
            <table id="deliveriesTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата</th>
                        <th>Количество товаров</th>
                        <th>Имя грузчика</th>
                        <th>Завершена поставка</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deliveries.map((elem) => {
                            return <DeliveryCard key={elem.id} deliveryData={elem} />
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
