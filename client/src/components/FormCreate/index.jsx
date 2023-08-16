import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';
import { createRecipe } from '../../redux/actions';

import styles from './FormCreate.module.css';
//Estado inicial del formulario
const formData = {
    name: '',
    description: '',
    img: '',
    healthScore: '',    
    steps:'',
    diets: [],
};

//Validaciones por cada campo del formulario
const formValidations = {    
    name: [        
        (value) => value.length >2,
        'Name must have more of two characters',
    ],
    description: [
        (value) => value.length > 5,
        'Description must have more of 10 characters',
    ],
    steps: [
        (value) => value.length > 30,
        'Steps must have more of 20 characters',
    ],
    img: [(value) => value.includes('https://'), 'Url Image is not valid'],

    healthScore: [
        (value) => value >= 1 && value <= 100,
        'Enter a number between 1 and 100',
    ],
    diets: [(value) => value.length >= 1, 'Diets Is Required'],
};
// console.log(formValidations.name);
export const FormCreate = () => {
    // const [nSteps, setNSteps] = useState(2);
    const [submited, setSubmited] = useState(false);
    const dispatch = useDispatch();
    const diets = useSelector((state) => state?.diets);

    const {
        name,
        description,
        img,
        steps,
        healthScore,
        formState,
        diets: dietsState,
        isformValid,
        onInputChange,
        onSelectChange,
        onSelectDelete,
        healthScoreValid,
        titleValid,
        imageValid,
        summaryValid,
        dietsValid,
    } = useForm(formData, formValidations);

    const onClose = () => {
        dispatch({ type: 'TOGGLE_CREATE' });
    };
    const onSubmit = (event) => {
    
        event.preventDefault();
        setSubmited(true);
        if (!isformValid) return;

        // console.log(formState);
        // // console.log(formStepsState);
        // console.log("**************************************");
       
        // dispatch(createRecipe(formState, formStepsState));
        dispatch(createRecipe(formState));
        dispatch({ type: 'TOGGLE_CREATE' });
    };

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <button type="button" className={`${styles.button} ${styles.buttonClone}`} onClick={onClose} > X </button>                
                <div className={styles.Container}>
                    <label className={styles.label}>Name</label>
                    <input
                        className={
                            !!titleValid && submited
                                ? styles.inputError
                                : styles.input
                        }
                        name="name"
                        value={name}
                        onChange={onInputChange}
                        type="text"
                        placeholder="Name of Recipe"
                    />
                    {!!titleValid && submited && (
                        <p className={styles.errorText}>{titleValid}</p>
                    )}
                      <div className={styles.selectContainer}>
                        
                    <label className={styles.label}>Health Score</label>
                    <input
                        className={
                            !!healthScoreValid && submited
                                ? styles.inputError
                                : styles.input
                        }
                        name="healthScore"
                        value={healthScore}
                        onChange={onInputChange}
                        type="number"
                        placeholder="1 to 100"
                    />
                    {!!healthScoreValid && submited && (
                        <p className={styles.errorText}>{healthScoreValid}</p>
                    )}
                        <label className={styles.label} htmlFor="Diets">
                            Diet Type
                        </label>
                        <select
                            className={styles.select}
                            onChange={onSelectChange}
                            id="diets"
                            name="diets"
                        >
                            <option value="All">Select</option>
                            {diets &&
                                diets.map(({ name, id }, i) => {
                                    return (
                                        <option key={i} value={id}>
                                            {name}
                                        </option>
                                    );
                                })}
                        </select>
                        <ul className={styles.selectedDietContainer}>
                            {dietsState.length >= 1 &&
                                dietsState.map((diet) => {
                                    const { name } = diets.find((element) => {
                                        return Number(diet) === element.id;
                                    });
                                    return (
                                        <li key={diet}>
                                            <p>{name}</p>
                                            <button
                                                name="diets"
                                                type="button"
                                                onClick={onSelectDelete}
                                                value={diet}
                                                className={styles.deleteDiet}
                                            >  X   </button>
                                        </li>
                                    );
                                })}
                        </ul>
                        {!!dietsValid && submited && (
                            <p className={styles.errorText}>{dietsValid}</p>
                        )}
                    </div>


                </div>
                {/* Column steps */}
              
                <div className={styles.Container}>               
                    <label className={styles.label}>Steps</label>
                    <textarea
                        className={
                            !!titleValid && submited
                                ? styles.textareaError
                                : styles.textarea
                        }
                        name="steps"
                        // value={steps.map(step => step.step).join('\n')}
                        value={steps}
                        onChange={onInputChange}
                        type="text"
                        placeholder="Describe steps"
                    />
                    {!!summaryValid && submited && (
                        <p className={styles.errorText}>{summaryValid}</p>
                    )}               
                </div>
                {/* Column image and create recipe */}
                
                <div className={styles.Container}>
                    <label className={styles.label}>Image Url</label>
                    <input
                        className={
                            !!imageValid && submited
                                ? styles.inputError
                                : styles.input
                        }
                        name="img"
                        value={img}
                        onChange={onInputChange}
                        type="text"
                        placeholder="https://....."
                    />
                    {!!imageValid && submited && (
                        <p className={styles.errorText}>{imageValid}</p>
                    )}
                    <img src={img} alt="" />

                    <label className={styles.label}>Description</label>
                    <textarea
                        className={
                            !!titleValid && submited
                                ? styles.textareaError
                                : styles.textarea
                        }
                        name="description"
                        value={description}
                        onChange={onInputChange}
                        type="text"
                        placeholder="Description"
                    />
                    {!!summaryValid && submited && (
                        <p className={styles.errorText}>{summaryValid}</p>
                    )}
                  <br/>
                    <button className={styles.button} type="submit">
                        Create Recipe
                    </button>
                </div>
            </form>
        </div>
    );
};
