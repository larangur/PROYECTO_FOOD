import React from 'react';

import { ItemRecipe } from '../ItemRecipe';
import { NoExist } from '../NoExist';

import styled from './RecipesContainer.module.css';

export const RecipesContainer = ({
    filteredRecipes,
    currentPage,
    itemsPerPage,
}) => {
    // console.log(filteredRecipes);
    // console.log("*********************");
    return (
        <section className={styled.container}>
            {filteredRecipes.length < 1 && <NoExist />}
            {filteredRecipes &&
                filteredRecipes
                    .slice(
                        (currentPage - 1) * itemsPerPage,
                        (currentPage - 1) * itemsPerPage + itemsPerPage
                    )
                    .map((recipe) => (                        
                        <ItemRecipe
                            key={recipe.id}
                            id={recipe.id}
                            image={recipe.img}
                            healthScore = {recipe.healthScore}
                            name={recipe.name}
                            cheap={recipe.cheap}                   
                            diets={recipe.diets}                          
                        />                        
                    ))}
        </section>
    );
};
