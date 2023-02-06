import { productUrl, paramId, queryString_url, createElement } from "./utils.js";

/**
 * retrieving the product's data from  the api
 */
function fetchProductData(){
    fetch(productUrl)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch((err) =>{
        alert("une erreur est survenur lors de la récupération des données de votre produit depuis l'API")

    })
    console.log(paramId)
}




fetchProductData()