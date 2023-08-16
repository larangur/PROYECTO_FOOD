import React from 'react';
import { Navbar } from '../../components/Navbar';

import styles from './NotFound.module.css';

export const NotFound = () => {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.Container}>
            <img className={styles.img} src="http://localhost:3000/images/check_rojo.png" alt=""/>
                <h1>404</h1>
                <h3>Not Found</h3>
            </div>
        </main>
    );
};
