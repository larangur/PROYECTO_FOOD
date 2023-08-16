import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemRecipe.module.css';

export const ItemRecipe = ({ id, image, name, healthScore, diets }) => {
    const dietsStrings = diets?.map((element) => element + ',');
    return (
        <div className={styles.itemContainer} key={id}>
            <Link to={`/recipes/${id}`}>
                <div className={styles.imgInfo}>
                  
                    <img
                        className={styles.img}
                        loading="lazy"
                        src={image}
                        alt={name}
                    />
                </div>
            </Link>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    <p>{name}</p>
                </div>
             <div className={styles.dietsContainer}>
                    <p>Diets</p>
                    <div>
                        {dietsStrings.slice(0, 2).map((dieta, i) => (
                            <span key={i * 2}>{dieta}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.textContainer}>
                <div className={styles.title}>
                    <p>{healthScore} healtscore</p>
                </div>
                </div>
            </div>
        </div>
    );
};
