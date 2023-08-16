import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks';
import { searchRecipe } from '../../redux/actions';

import styles from './SearchBar.module.css';

const formData = {
    search: '',
};

export const SearchBar = () => {
    const dispatch = useDispatch();
    const { search, onInputChange } = useForm(formData);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(searchRecipe(search.toLowerCase()));
    };
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <input
                className={styles.inputSearch}
                placeholder="Search recipes..."
                type="text"
                name="search"
                value={search}
                onChange={onInputChange}
            />
            <button className={styles.button} type="submit">
                Search
             
            </button>
        </form>
    );
};
