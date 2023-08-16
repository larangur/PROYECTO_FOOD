import React from 'react';

import styles from './NoExist.module.css';
export const NoExist = () => {
    return (
        <div className={styles.container}>
        <h1>The requested information was not found</h1>
        <img className={styles.img} src="http://localhost:3000/images/check_rojo.png" alt=""/>
        </div>
        
      
    );
};
