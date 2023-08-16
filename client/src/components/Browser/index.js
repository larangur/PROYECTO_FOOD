import React from 'react';

import styles from './Browser.module.css';

export const Browser = ({ children }) => {
    return <section className={styles.browser}>{children}</section>;
};
