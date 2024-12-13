import React from "react"
import Header from "../components/HeaderComponent/Header";
import cls from '../styles/Analitycs.module.css'
import Statistics from "../components/Statisctics/Statistics";
import Statistics2 from "../components/Statistics2/Statistics2";

const Analitycs = (props) => {
  return (
    <div>
      <Header />
      <main className={cls.main}>
        <div className={cls.container}>
            <div className={cls.grafCont}>
                <Statistics />  
            </div>
            <div className={cls.grafCont}>
                <Statistics2 />
            </div>
        </div>
      </main>
    </div>
  )
};

export default Analitycs;
