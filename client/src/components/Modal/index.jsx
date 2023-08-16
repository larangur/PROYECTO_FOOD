import { useDispatch } from 'react-redux';
import styles from './Modal.module.css';

export const Modal = ({ title, icon, subtitle }) => {

    const dispatch = useDispatch();
    const onClose = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };
    return (
        <div className={styles.container}>
            <section className={styles.modal}>

            
                
                <div className={styles.textContainer}>
                <img className={styles.img} src={`http://localhost:3000/images/${icon}`} alt=""/>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <button onClick={onClose} className={styles.button}>
                    X
                </button>
            </section>
        </div>
    );
};
