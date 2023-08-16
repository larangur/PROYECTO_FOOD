import React from 'react';

import styles from './Pagination.module.css';

export const Pagination = ({
    currentPage,
    nextPage,
    previousPage,
    maxPages,
}) => {
    return (
        <div className={styles.paginationContainer}>
            <button
                className={styles.button}
                disabled={currentPage === 1 || maxPages === 0}
                onClick={previousPage}
            >
                {'<'}
            </button>
            <span className={styles.text}>
                {maxPages === 0 ? '0' : currentPage} of {maxPages}
            </span>
            <button
                className={styles.button}
                disabled={currentPage === maxPages || maxPages === 0}
                onClick={nextPage}
            >
                {'>'}
            </button>
        </div>
    );
};