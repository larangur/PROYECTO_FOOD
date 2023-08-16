import { useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '../../redux/actions';

import { LoadingGlobal, Navbar } from '../../components';

import styles from './DetailPage.module.css';

export const DetailPage = () => {
    
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    const {
        summary,
        img,
        name,
        diets,
        steps,     
        healthScore,
        // db,
        // id,
    } = useSelector((state) => state?.recipe);
    const onLoading = useSelector((state) => state.onLoading);
    // const Diets = diets
    //     ?.map((diet) => diet.charAt(0).toUpperCase() + diet.slice(1))
    //     .join(' - ');

    useEffect(() => {
        dispatch(getRecipeDetail(recipeId));
    }, []);

   
    return (
        <>
            <header className={styles.header}>
                <Navbar />
            </header>
            <main className={styles.main}>
                {onLoading ? (
                    <>
                        <LoadingGlobal />
                    </>
                ) : (
                    <>
                        <section className={styles.titleContainer}>
                            <img src={img} alt="" />

                            <div className={styles.title}>
                                <h1>{name}</h1>
                                <h2>{healthScore}... point</h2>
                            </div>
                            <div className={styles.summary}>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: summary,
                                    }}
                                ></p>
                            </div>
                        </section>
                        <section className={styles.stepsContainer}>
  <div className={styles.steps}>
    <h4>Preparation</h4>
    <section className={styles.container}>
      {Array.isArray(steps) ? (
        steps.map(({ step, number }) => <h2 key={number}>{step}</h2>)
      ) : (
        <h2>{steps}</h2>
      )}
    </section>
    <div className={styles.stepsShadow}></div>
  </div>
</section>
                        <section className={styles.infoSectionContainer}>
                            <div className={styles.infoSection}>
                                <div className={styles.recipeInfo}>
                                    <div className={styles.infoText}>
                                      <h1>DIETS:</h1>
                                    <div className={styles.diets}>
                                    <h1>{diets}  </h1>
                                     </div>

                                    </div>
                                 
                                </div>
            
                            </div>
                        </section>
                    </>
                )}
            </main>
        </>
    );
};
