import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    GET_SORT, 
    GET_SORT_DIET,
    GET_SORT_SCORE,
    DELETE_FILTERS,
    TOGGLE_CREATE,
    IS_LOADING,
    CREATE_RECIPE,
    CLOSE_MODAL,
    SEARCH_RECIPE,
    GET_SORT_FROM,
    DELETE_RECIPE,
} from './actions-types';

const initialState = {
    allRecipes: [],
    recipe: [],
    filteredRecipes: [],
    diets: [],
    onCreate: false,
    onLoading: true,
    created: false,
    deleted: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Acá va tu código:
        case GET_RECIPES:
            return {
                ...state,
                onLoading: false,
                allRecipes: action.payload,
                filteredRecipes: action.payload,
            };
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            };
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipe: action.payload,
                onLoading: false,
            };

        case GET_SORT:
            const sort =            
                action.payload === 'asc'
                 ? [...state.filteredRecipes].sort((a, b) => {
                    // ? [filteredRecipes].sort((a, b) => {
                          if (a.name > b.name) return 1;
                          if (a.name < b.name) return -1;
                          return 0;
                      })
                    : action.payload === 'desc'
                    ? [...state.filteredRecipes].sort((a, b) => {
                    // ? [filteredRecipes].sort((a, b) => {
                          if (a.name > b.name) return -1;
                          if (a.name < b.name) return 1;
                          return 0;
                      })
                    : [...state.allRecipes];
                return {                
                ...state,
                filteredRecipes: sort,
            };

        case GET_SORT_SCORE:
            const sortScore =
                action.payload === 'asc'
                    ? [...state.filteredRecipes].sort(
                          (a, b) => b.healthScore - a.healthScore
                      )
                    : action.payload === 'desc'
                    ? [...state.filteredRecipes].sort(
                          (a, b) => a.healthScore - b.healthScore
                      )
                    : [...state.allRecipes];
            return {
                ...state,
                filteredRecipes: sortScore,
            };

        case GET_SORT_DIET:
            if (action.payload === 'All') {
                return {
                    ...state,
                    filteredRecipes: [...state.allRecipes],
                };
            }
            const filtered = [...state.allRecipes].filter((recipe) =>
                recipe.diets.includes(action.payload)
            );
            return {
                ...state,
                filteredRecipes: filtered,
            };
            
        case GET_SORT_FROM:
            // console.log([...state.allRecipes]);
            if (action.payload === 'All') {
                return {                    
                    ...state,
                    filteredRecipes: [...state.allRecipes],
                };
            }
            const filterFrom =  action.payload === 'db'
                    ? [...state.allRecipes].filter((recipe) => recipe.DB === true )
                    : action.payload === ''
                    ? [...state.allRecipes].filter((recipe) => recipe.DB === false)
                    : [...state.allRecipes];
                    
            return {
                ...state,
                filteredRecipes: filterFrom,
            };

        case DELETE_FILTERS:
            return {
                ...state,
                filteredRecipes: [...state.allRecipes],
            };
        case TOGGLE_CREATE:
            return {
                ...state,
                onCreate: !state.onCreate,
            };
        case IS_LOADING:
            return {
                ...state,
                onLoading: true,
            };
        case CREATE_RECIPE:
            return {
                ...state,
                onLoading: false,
                created: true,
            };
        case DELETE_RECIPE:
            return {
                ...state,
                onLoading: false,
                deleted: true,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                created: false,
                deleted: false,
            };
        case SEARCH_RECIPE:
            return {
                ...state,
                filteredRecipes: action.payload,
                onLoading: false,
            };
        default:
            return state;
    }


};

export default rootReducer;
