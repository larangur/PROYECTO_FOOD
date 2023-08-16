import axios from 'axios';
import {
    CREATE_RECIPE,
    DELETE_FILTERS,
    GET_DIETS,
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    GET_SORT, 
    GET_SORT_DIET,
    GET_SORT_SCORE,
    IS_LOADING,
    TOGGLE_ERROR,
    SEARCH_RECIPE,
    GET_SORT_FROM

} from './actions-types';

// Aca deben declarar las variables donde tengan el action types.
// 
const instance = axios.create({
    baseURL: 'http://localhost:3001',
});
// actions gets
export const getAllRecipes = () => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    const { data } = await instance('/food');
    dispatch({ type: GET_RECIPES, payload: data });
};


export const getAllDiets = () => async (dispatch) => {
    const { data } = await instance('/diets');
    dispatch({ type: GET_DIETS, payload: data });
};
export const getRecipeDetail = (id) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    const { data } = await instance(`/food/${id}`);
    dispatch({ type: GET_RECIPE_DETAIL, payload: data });
};

// actions filters
export const sortByName = (data) => (dispatch) => {
    dispatch({ type: GET_SORT, payload: data });
};

export const sortByDiet = (data) => (dispatch) => {
    dispatch({ type: GET_SORT_DIET, payload: data });
};
export const sortByScore = (data) => (dispatch) => {
    dispatch({ type: GET_SORT_SCORE, payload: data });
};
export const sortByCreated = (data) => (dispatch) => {
    dispatch({ type: GET_SORT_FROM, payload: data });
};
export const deleteFilters = () => (dispatch) => {
    dispatch({ type: DELETE_FILTERS });
};

export const createRecipe = (recipe) => async (dispatch) => {    
    console.log(recipe);
    console.log("**recipe****************");
    dispatch({ type: IS_LOADING });
    const response = await instance.post('/food', {
        ...recipe
    });
    if (response.status !== 201) {
        dispatch({ type: TOGGLE_ERROR, payload: 'Dont Create recipe' });
    }
    dispatch({ type: CREATE_RECIPE, payload: recipe });
};


export const searchRecipe = (recipe) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    const { data } = await instance(`/food?name=${recipe}`);
    dispatch({ type: SEARCH_RECIPE, payload: data });


};

export const getObjIngredients = (ingredientList) => {
    const myingredients = ingredientList.split(',');
    return myingredients.map((ingredient) => {
        return { name: ingredient };
    });
};
