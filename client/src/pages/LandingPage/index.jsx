import React from 'react';
import { Link } from 'react-router-dom';


import styles from './LandingPage.module.css';

export const LandingPage = () => {
    return (
        <main className={styles.main}>
                        <section className={styles.sectionImg}>
                <img className={styles.img} src="http://localhost:3000/images/foto_inicial_transparente.png" alt=""/>
            </section>

            <section className={styles.section}>
                <div className={styles.title}>
                    <h1>Keep Calm, </h1>
                    
                    <h1>enjoy eating</h1>
                </div>
                <div className={styles.summary}>
                    <div>
                        <p>
                        The kitchen is multisensory, it is directed to the eye, the mouth, the nose, the ear and the mind. No art has that complexity.
We learn to cook with the kitchen of others and at a given moment, we make our own
                        </p>
                        <Link to="/home">.::START::.</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};
