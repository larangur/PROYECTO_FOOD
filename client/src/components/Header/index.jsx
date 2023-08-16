import React from 'react';
import { Navbar } from '../Navbar';

import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <Navbar />
            <div className={styles.image}>
                <img
                    src="http://localhost:3000/images/cocina_benner.jpg"
                    alt=""
                />
            </div>
        </header>
    );
};
