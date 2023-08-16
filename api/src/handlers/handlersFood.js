const { error, log } = require("console");
const { 
getApiInfo
,getDiets
,getApiByName
,getApiInfoById     
,getInfoByName
,getRecipesDb
,getRecipesDbById
,getRecipeDbByName
,getInfo
,getInfoById
,dietsSaveDB
,postFood
} = require('../controlers/controlers.js')


const getHandlerFood = async( req,res)=> {
    const {name} = req.query;
    try{
        if(name){
            let dataFood= await getInfoByName(name);
            res.status(200).json(dataFood);
        }else{
            let dataFood = await getInfo();
            res.status(200).json(dataFood);
        }
        //res.status(200).json("TODO VA BIEN HASTA ACA");
     }catch(error){
         res.status(400).json({error: error.message});
     }    
}

const getHandlerFoodId = async(req, res) =>{
    const { idFood } = req.params;  
    // console.log("***************");  
    // console.log(idFood );
    try{
        const buscaId = await getInfoById(idFood)                              
        res.status(200).json(buscaId);
        //res.status(200).json(`TODO VA BIEN HASTA ACA --->  ${id}` );        
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const postHandlerFood = async (req, res) => {
    const {name, img, healthScore, description,  steps,diets} = req.body;
    try {
        // añadimos el registo al modelo Recipe
        const newRecipe = await postFood( name, img, healthScore, description,  steps,diets)
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getHandlerDiets = async( req,res)=> {    
    try{
            let dataDiets = await getDiets();
            res.status(200).json(dataDiets);
     }catch(error){
         res.status(400).json({error: error.message});
     }    
}

const configDiets = async (req, res) => {
    const dataDiets = await dietsSaveDB()
}
configDiets();

module.exports = {
    getHandlerFood 
    ,getHandlerFoodId     
    ,postHandlerFood
    ,configDiets
    ,getHandlerDiets
}
