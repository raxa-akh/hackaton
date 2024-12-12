import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/HeaderComponent/Header';
import cls from "../styles/Dashboard.module.css"
import MainModal from '../modal/MainModal';


let tasks = [
    {
        'id': 0,
        "title": "Купить продукты",
        "description": "Купить овощи и фрукты на неделю",
        "tags": [1, 2],
        "complexity": 10,
        "scope": "in_family",
        "family": 1,
        "is_completed": false,
        "recommend_time_in_min": 60,
        "created_datetime": "2024-01-01T12:00:00Z",
        "closed_datetime": null,
        "closed_by": null
    },
    {   
        'id': 1,
        "title": "Вынести мусор",
        "description": "",
        "tags": [3],
        "complexity": 10,
        "scope": "in_family",
        "family": 1,
        "is_completed": true,
        "recommend_time_in_min": 10,
        "created_datetime": "2024-01-02T08:00:00Z",
        "closed_datetime": "2024-01-02T08:15:00Z",
        "closed_by": 2
    },
    {
        'id': 2,
        "title": "Сделать домашнее задание",
        "description": "Подготовиться к контрольной по математике",
        "tags": [4],
        "complexity": 30,
        "scope": "in_family",
        "family": 2,
        "is_completed": false,
        "recommend_time_in_min": 120,
        "created_datetime": "2024-01-03T15:00:00Z",
        "closed_datetime": null,
        "closed_by": null
    }
]
const Dashboard = () => {
    
    const [selectedTask, setSelectedTask] = useState(null);
    const [clickedBtn, setClickedBtn] = useState(null);
    const modalRefEdit = useRef(null);
    const modalRefAdd = useRef(null);

    useEffect(() => {
        if (clickedBtn === 'Edit' && modalRefEdit.current) {
            modalRefEdit.current.showModal();
        }

        if (clickedBtn === 'Add' && modalRefAdd.current) {
            modalRefAdd.current.showModal();
        }
    }, [clickedBtn]);

    const handleCloseModalEdit = () => {
        if (modalRefEdit.current) {
            modalRefEdit.current.close();
        } 
    };

    const handleCloseModalAdd = () => {
        if (modalRefAdd.current) {
            modalRefAdd.current.close();
        } 
    };

    const editClickBtn = (task) =>{
        setClickedBtn('Edit');
        setSelectedTask(task);
        setTimeout(() => {
            setClickedBtn('');
        },20)
        
    }

    const addClickBtn = () =>{
        setClickedBtn('Add');
        setSelectedTask({});
        setTimeout(() => {
            setClickedBtn('');
        },20)
    }

    const saveBtn = () =>{
        let id = tasks.findIndex(task => task.id === selectedTask.id);
        tasks[id] = selectedTask;
        setSelectedTask(null);
        handleCloseModalEdit();
    }

    const delBtn = (id) =>{
        tasks = tasks.filter(item => item.id !==id);
        setSelectedTask(null);
        handleCloseModalEdit();
    }

    const addTask = () => {
        tasks.push(selectedTask);
        setSelectedTask({});
        handleCloseModalAdd();
    }
    

    return (
        <div>
            <Header/>
            <main className={cls.main}>
                <div className={cls.container}>
                    <div className={cls.header}>
                        <h1>Dashboard</h1>
                        <button onClick={() => addClickBtn()} className={cls.buttonHeader}>Добавить</button>
                    </div>
                    <div className={cls.tableContainer}>
                    <table
                                className={`${cls.table_family}`}

                            >
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Complexity</th>
                                        <th>FamilyID</th>
                                        <th>isCompleted</th>
                                        <th>ClosedBy</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => (
                                        <tr
                                            key={task?.id}
                                            
                                        >
                                            <td>{task.title}</td>
                                            <td>{task.description ? task.description : '-'}</td>
                                            <td>{task.complexity}</td>
                                            <td>{task.family}</td>
                                            <td>{task.is_completed ? "YES" : "NO"}</td>
                                            <td>{task.closed_by ? task.closed_by : '-'}</td>
                                            <td>
                                                <button onClick={() => editClickBtn(task)} className={cls.tableBtn}>Изменить</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <MainModal ref={modalRefEdit} title='Изменения задания' modalClose={handleCloseModalEdit}>
                                    <div className={cls.modalContainer}>
                                        <div className={cls.fields}>
                                            <span className={cls.modalLabel}>Title</span>
                                            <input type="text" onChange={(e)=>setSelectedTask({...selectedTask, title : e.target.value})} className={cls.modalInput} placeholder={selectedTask?.title}/>
                                            <span className={cls.modalLabel}>Description</span>
                                            <input type="text" onChange={(e)=>setSelectedTask({...selectedTask, description : e.target.value})} className={cls.modalInput} placeholder={selectedTask?.description}/>
                                            <span className={cls.modalLabel}>Complexity</span>
                                            <input type="text" onChange={(e)=>setSelectedTask({...selectedTask, complexity : e.target.value})} className={cls.modalInput} placeholder={selectedTask?.complexity}/>
                                            <span className={cls.modalLabel}>FamilyID</span>
                                            <input type="text" onChange={(e)=>setSelectedTask({...selectedTask, family : e.target.value})} className={cls.modalInput} placeholder={selectedTask?.family}/>
                                        </div>
                                        <div className={cls.modalBtns}>
                                            <button onClick={() => saveBtn()} type="button" className={cls.modalBtn1}>Сохранить</button>
                                            <button onClick={() => delBtn(selectedTask.id)} type="button" className={cls.modalBtn}>Удалить</button>
                                        </div>
                                    </div>
                            </MainModal>
                            <MainModal ref={modalRefAdd} title='Добавление  задания' modalClose={handleCloseModalAdd}>
                                <div className={cls.modalContainer}>
                                        <div className={cls.fields}>
                                            <span className={cls.modalLabel}>Title</span>
                                            <input onChange={(e)=>setSelectedTask({...selectedTask, title : e.target.value})} type="text" className={cls.modalInput} />
                                            <span className={cls.modalLabel}>Description</span>
                                            <input onChange={(e)=>setSelectedTask({...selectedTask, description : e.target.value})} type="text" className={cls.modalInput} />
                                            <span className={cls.modalLabel}>Complexity</span>
                                            <input onChange={(e)=>setSelectedTask({...selectedTask, complexity : e.target.value})} type="text" className={cls.modalInput} />
                                            <span className={cls.modalLabel}>FamilyID</span>
                                            <input onChange={(e)=>setSelectedTask({...selectedTask, family : e.target.value})} type="text" className={cls.modalInput} />
                                        </div>
                                        <div className={cls.modalBtns}>
                                            <button onClick={() => {addTask()}} type="button"  className={cls.modalBtn1}>Сохранить</button>
                                        </div>
                                    </div>
                            </MainModal>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
