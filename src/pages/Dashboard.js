import { useState, useRef, useEffect } from "react";
import Header from '../components/HeaderComponent/Header'
import MainModal from "../modal/MainModal";
import cls from '../styles/Dashboard.module.css'
import style from '../modal/modalOptions.module.css'
import { FaPlus, FaTrash } from "react-icons/fa";

const Dashboard = () => {
    const [selectedLoader, setSelectedLoader] = useState([]); // Доступные грузчики
    const [open, setOpen] = useState(false);
    const [loaderAssignments, setLoaderAssignments] = useState({});
    const [selectedDelivery, setSelectedDelivery] = useState(null); // Текущая выбранная поставка
    const modalRef = useRef(null);

    useEffect(() => {
        // Пример грузчиков
        setSelectedLoader([
            { id: 1, loaderName: 'Иван Петров' },
            { id: 2, loaderName: 'Сергей Смирнов' },
            { id: 3, loaderName: 'Анна Кузнецова' },
            { id: 4, loaderName: 'Дмитрий Иванов' },
            { id: 5, loaderName: 'Елена Васильева' },
        ]);
    }, []);

    useEffect(() => {
        if (open && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [open]);

    const deliveries = [
        { id: 1, date: '2024-12-01', quantity: 50, isCompleted: true },
        { id: 2, date: '2024-12-02', quantity: 30, isCompleted: false },
        { id: 3, date: '2024-12-03', quantity: 20, isCompleted: true },
        { id: 4, date: '2024-12-04', quantity: 15, isCompleted: false },
        { id: 5, date: '2024-12-05', quantity: 40, isCompleted: true },
    ];

    const addLoaderToDelivery = (deliveryId, loader) => {
        setLoaderAssignments((prev) => {
            if (Object.values(prev).some((assignedLoader) => assignedLoader?.id === loader.id)) {
                return prev;
            }
            return {
                ...prev,
                [deliveryId]: [...(prev[deliveryId] || []), loader],
            };
        });
    };

    const removeLoaderFromDelivery = (deliveryId, loaderId) => {
        setLoaderAssignments((prev) => {
            const newAssignments = { ...prev };
            newAssignments[deliveryId] = newAssignments[deliveryId]?.filter(
                (loader) => loader.id !== loaderId
            );
            if (newAssignments[deliveryId]?.length === 0) {
                delete newAssignments[deliveryId];
            }
            return newAssignments;
        });
    };

    const handleOpenModal = (delivery) => {
        setSelectedDelivery(delivery);
        setOpen(true);
    };

    const handleClose = () => {
        if (modalRef.current) {
            setOpen(false);
            modalRef.current.close();
        }
    };

    return (
        <div>
            <Header />

            <main className={cls.main}>
                <div className={cls.container}>
                    <h2>Таблица поставок</h2>
                    <table className={cls.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Дата</th>
                                <th>Количество товаров</th>
                                <th>Имена грузчиков</th>
                                <th>Завершена поставка</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.map((delivery) => (
                                <tr key={delivery.id}>
                                    <td>{delivery.id}</td>
                                    <td>{delivery.date}</td>
                                    <td>{delivery.quantity}</td>
                                    <td>
                                        {(loaderAssignments[delivery.id]?.map((l) => l.loaderName).join(', ')) ||
                                            'Не назначено'}
                                    </td>
                                    <td>{delivery.isCompleted ? 'Да' : 'Нет'}</td>
                                    <td onClick={() => handleOpenModal(delivery)}>
                                        ...
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            

            {open && selectedDelivery && (
                <MainModal ref={modalRef} title={`Назначение грузчиков: Поставка ${selectedDelivery.id}`} modalClose={handleClose}>
                    {selectedLoader.map((loader) => (
                        <div className={style.modalOptions_item} key={loader.id}>
                            <span>{loader.loaderName}</span>
                            {loaderAssignments[selectedDelivery.id]?.some((l) => l.id === loader.id) ? (
                                <button className={style.deleteButton} onClick={() => removeLoaderFromDelivery(selectedDelivery.id, loader.id)}>
                                    Удалить <FaTrash />
                                </button>
                            ) : (
                                <button className={style.addButton} onClick={() => addLoaderToDelivery(selectedDelivery.id, loader)}>
                                    Добавить <FaPlus />
                                </button>
                            )}
                        </div>
                    ))}
                </MainModal>
            )}
        </div>
    );
};

export default Dashboard;
