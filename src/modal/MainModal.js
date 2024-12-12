import { forwardRef } from "react";
import cls from "../styles/MainModal.module.css"
import close from "../assets/close.svg"

const MainModal = forwardRef(({children, modalClose, title  }, ref) => {
    

    return(
        <dialog ref={ref} className={cls.dialog}>
            <div className={cls.closeBtn} >
                <span className={cls.closeTitle}>{title}</span>
                <img  alt="" onClick={() => modalClose()} style={{width: '25px'}} src={close}/>
            </div>
            {children}
        </dialog>
    )
});

export default MainModal;