import React from 'react';

import styles from './Input.module.css';

export const Input = ({
    name,  
    type,
    placeholder,
    inputValue,
    onInputChange,
}) => {
    return (
        <>
            <label className={styles.label}>{name}</label>
            <input
                className={styles.input}
                type={type}
                placeholder={placeholder}
                value={inputValue}
                onChange={onInputChange}
            />
        </>
    );
};
