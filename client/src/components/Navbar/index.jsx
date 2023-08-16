import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';
export const Navbar = () => {
    return (
        <div className={styles.container}>
            <div>
                <img src="master_negro.jpg" alt="" />
            </div>
            <div>
                <NavLink exact to="/home" className={(isActive) => isActive ? styles.active : styles.inactive} > Home  </NavLink>      
                <NavLink exact to="/" className={(isActive) =>  isActive ? styles.active : styles.inactive}>Exit </NavLink>
            </div>
        </div>
    );
};
