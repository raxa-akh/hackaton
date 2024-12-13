import Header from "../components/HeaderComponent/Header";
import cls from "../styles/Dashboard.module.css"

function MainPage(){
    return(
        <div>
            <Header/>
            <main className={cls.main}>
                <div className={cls.container}>
                    <h1>Добро пожаловать!</h1>
                </div>
            </main>
        </div>
    )
}

export default MainPage;