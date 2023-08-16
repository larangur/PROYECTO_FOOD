import styles from './CreateButton.module.css';
import { useDispatch } from 'react-redux';

export const CreateButton = () => {
    const dispatch = useDispatch();

    const onCreate = () => {
        dispatch({ type: 'TOGGLE_CREATE' });
    };
    return (
        <button onClick={onCreate} className={styles.button}>
            ::Create Recipe::
        </button>
    );
};
