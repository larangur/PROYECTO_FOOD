import React from 'react';
import { useFilters } from '../../hooks';

import styles from './Filters.module.css';

export const Filters = ({ resetPage }) => {
    const {
        diets,
        handleSort,
        handleSortByDiet,        
        handleSortByCreated,
        openFilters,
        toggleFilters
    } = useFilters(resetPage);
    return (
        <section className={styles.filtersContainer}>
            <button onClick={toggleFilters} className={styles.buttonOpen} type="button">
                Filters
            </button>
            <div className={openFilters ? styles.containerOpen : styles.container}>
                <div className={styles.filterContainer}>
                    <label className={styles.label} htmlFor="sort">
                        Sort
                    </label>
                    <select
                        className={styles.select}
                        id="sort"
                        name="Sort"
                        onChange={handleSort}
                    >
                        <option value="sort">[A-Z]</option>
                        <option value="asc">Name (A-Z)</option>
                        <option value="desc">Name (Z-A)</option>
                    </select>
                </div>
                <div className={styles.filterContainer}>
                    <label className={styles.label} htmlFor="origin">
                        Source
                    </label>
                    <select
                        className={styles.select}
                        id="created"
                        name="created"
                        onChange={handleSortByCreated}
                    >
                        <option value="All">All</option>
                        <option value="api">Api</option>
                        <option value="db">Db</option>
                    </select>
                </div>
       
                <div className={styles.filterContainer}>
                    <label className={styles.label} htmlFor="Diets">
                        Diet Type
                    </label>
                    <select
                        className={styles.select}
                        id="diets"
                        name="diets"
                        onChange={handleSortByDiet}
                    >
                        <option value="All">All</option>
                        {diets &&
                            diets.map((diet, i) => (
                                <option key={i} value={diet.name}>
                                    {diet.name}
                                </option>
                            ))}
                    </select>
                </div>

            
            </div>
        </section>
    );
};
