import { useEffect, useMemo, useState } from 'react';
import { getObjIngredients } from '../redux/actions';

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    const isformValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        
            // any form value
            setFormState({
                ...formState,
                [name]: value,
            });
            return;
        
        const [stepNumber, modify] = name.split('-'); // Get values for work with steps
        const newState = { ...formState }; // Create a copy of the previous state
        if (modify === 'ingredients') {
            const ingredients = getObjIngredients(value);
            newState[stepNumber] = {
                ...newState[stepNumber],
                number: stepNumber[4],
                [modify]: ingredients,
            };
        } else {
            newState[stepNumber] = {
                ...newState[stepNumber],
                number: stepNumber[4],
                [modify]: value,
            };
        }
        setFormState(newState);
    };

    const onSelectChange = ({ target }) => {
        const { name, value } = target;
        if (value !== 'ALL' && !formState[name].includes(value)) {
            setFormState({
                ...formState,
                [name]: [...formState[name], value],
            });
        }
    };

    const onSelectDelete = ({ target }) => {
        const { name, value } = target;
        if (value !== 'ALL') {
            setFormState({
                ...formState,
                [name]: formState[name].filter((diet) => diet !== value),
            });
        }
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField])
                ? null
                : errorMessage;
        }
        setFormValidation(formCheckedValues);
    };

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        onSelectChange,
        onSelectDelete,
        ...formValidation,
        isformValid,
    };
};
