require("dotenv").config();
const { Op } = require('sequelize');
const axios = require("axios");
const {Recipe,  Diets } = require("../db.js");  

const { API_KEY } = process.env;


const dietsSaveDB = async () => {
    
    const newDiets = [
        'gluten free',
        'ketogenic',
        'dairy free',
        'vegan',
        'lacto ovo vegetarian',
        'pescatarian',
        'paleolithic',
        'fodmap friendly',
        'paleo',
        'primal',
        'whole 30',
    ];
    let diestDBcount = await Diets.findAll();
    if(diestDBcount.length === 0 ){
        const dietsPms = newDiets.map((d) => {
            return Diets.create({ name: d });
        });
        await Promise.all(dietsPms);    
    }
};


/** LLAMADO A LA API DE FOOD*/
const getApiInfo = async () => {
    try
    {
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const { results } = resAxios.data ;            
        if (results.length > 0) {
            let response = await results?.map((result) => {
                return {
                    name: result.title,
                    img: result.image, 
                    id: result.id, 
                    healthScore: result.healthScore,
                    diets: result.diets?.map(element => element), 
                    description:result.summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n "):''),
                    DB : false
                }        
            })
        return response;
    } 

    }catch (error) {
        console.error(error);
        return ([])
    }
}

const getApiByName = async (name) => {           
    try{
    
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        const { results } = resAxios.data;   
        const  totalResults  = resAxios.data.totalResults;   
        if (totalResults === 0){
            return ('')   
        }
        else{
     
            let response = results?.map((result) => {
                return {                    
                    name: result.title,                    
                    img: result.image, 
                    id: result.id,                    
                    healthScore: result.healthScore,
                    diets: result.diets?.map(element => element), 
                    description:result.summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n "):''),
                    DB : false
                }
            })           
      
            return response    

    }
    }catch (error) {        
        console.error(error);
        return ('error')
    }
}

const getApiInfoById = async (id) => {
  
    try {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);;
        return data;
    } catch (error) {
        throw new Error("error: " && error);
    }
};





const getRecipesDb = async () => {
    const recipes = await Recipe.findAll();
    const recipesWithDiets = await Promise.all(
        recipes.map(async (recipe) => {
            const diets = await recipe.getDiets();
            const dietsString = diets.map((diet) => diet.name);
            return { ...recipe.toJSON(), diets: dietsString };
        })
    );

    return recipesWithDiets;
};
const getRecipesDbById = async (id) => {
    if (!id) throw new Error(`The id is required`);
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return;
    const diets = await recipe.getDiets();
    const dietsString = diets.map((diet) => diet.name);
    return { ...recipe.toJSON(), diets: dietsString };
};


const getRecipeDbByName = async (name) => {
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Diets,
        through: {
          attributes: [],
        },
        attributes: ['name'], // Agregar esta línea para obtener solo los nombres de las dietas
      },
    });
    if (!recipes) throw new Error(`Does not exist recipes with name: ${name}`);
    const recipeList = recipes.map((recipe) => {
      const diets = recipe.diets.map((diet) => diet.name);
      return {
        //name: recipe.name,
        ...recipe.toJSON(),        
        diets: diets,
      };
    });
    
    return recipeList;
  };



const getInfoById = async (id) => {
    if (!id) throw new Error(`The id is required`);
    const isNumeric = !isNaN(id);
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

    try {
        // información de la db
        if (isNumeric) {
            const resultApi = await getApiInfoById(id);
            if (resultApi) {
                const receta = {
                    name: resultApi.title,
                    img: resultApi.image,
                    healthScore: resultApi.healthScore,
                    description: resultApi.summary,
                    steps: resultApi.analyzedInstructions[0]?.steps,
                    diets: resultApi.diets,
                    DB: false
                };
                return receta;
            }
    
          } else if (isUUID) {
            // Acciones a realizar si es un valor UUID
            const resultDb = await getRecipesDbById(id);
            if (resultDb) {
                return resultDb;
            }    
          } else {
            // Acciones a realizar si no es ni numérico ni UUID
            throw new Error(`Does not exist a recipe with id: ${id}`);
          }
    } catch (error) {
        throw new Error(error);
    }
};
const getDiets = async() =>{
    let dataDiets = await Diets.findAll();
    return dataDiets 
}

//all data
const getInfo = async () => {
    const recipesDB = await getRecipesDb();
    const recipesAPI = await getApiInfo();
    const recipesAll  = [...recipesDB ,  ...recipesAPI  ]
    return recipesAll;
};
/// search for name

const getInfoByName = async (name) => {
        const recipesDB = await getRecipeDbByName(name);
        const recipesApi = await getApiByName(name);
        const recipesAll  = [...recipesDB , ...recipesApi]
        return recipesAll;
};

const postFood = async( name, img, healthScore, description,  steps,diets) =>{
    const recipe = await Recipe.create({
        name, img, healthScore, description,  steps
    });
    await recipe.addDiet(diets);
}


module.exports = {
    getInfoByName
    ,getApiInfo
    ,getInfo
    ,getInfoById
    ,postFood
    ,dietsSaveDB
    ,getDiets
     ,getRecipesDb
     ,getRecipesDbById
     ,getRecipeDbByName
    

};
