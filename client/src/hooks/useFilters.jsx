import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteFilters,
    getAllDiets,
    sortByCreated,
    sortByDiet,
    sortByName,
    
} from '../redux/actions';

export const useFilters = (resetPage) => {
    const [openFilters, setOpenFilters] = useState(false);
    const dispatch = useDispatch();
    const diets = useSelector((state) => state?.diets);

    const handleSort = (event) => {
        resetPage(1);
        const selectedValue = event.target.value;
        dispatch(sortByName(selectedValue));
    };
    const handleSortByDiet = (event) => {
        resetPage(1);
        const selectedValue = event.target.value;
        dispatch(sortByDiet(selectedValue));
    };

    const handleSortByCreated = (event) => {
        resetPage(1);
        const selectedValue = event.target.value;
        dispatch(sortByCreated(selectedValue));
    };
    const toggleFilters = () => {
        setOpenFilters(!openFilters);
    };
    const handleDeleteFilters = () => {
        dispatch(deleteFilters());
        document.getElementById('sort').value = 'sort';      
        document.getElementById('created').value = 'All';
        document.getElementById('diets').value = 'All';
      
    };
    useEffect(() => {        
        dispatch(getAllDiets());
    }, []);

    return {
        
        diets,
        handleSort,
        handleSortByDiet,    
        handleDeleteFilters,
        handleSortByCreated,
        toggleFilters,
        openFilters,
    };
};
