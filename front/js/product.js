import { productUrl, paramId, queryString_url, createElement } from "./utils.js";

/**
 * retrieving the product's data from  the api with fetch
 */
function fetchProductData(){
    fetch(productUrl)
    .then((res) => res.json())
    .then((data) => {
       implementatingProductDetails(data);
    })
    /**
     * if the retrieval is not possible,an  alert will appear
     */
    .catch((err) =>{
        alert("une erreur est survenur lors de la récupération des données de votre produit depuis l'API")

    })
}
//calling the function
fetchProductData();
/**
   implementing the product's elements in the DOM
 */

function implementatingProductDetails (data)  {
    //making image
    const ProductImage = document.createElement('img');
    ProductImage.src = data.imageUrl;
    ProductImage.alt = data.altTxt;
    const imgParent = document.querySelector('.item__img');
    imgParent.appendChild(ProductImage);

    //adding Name
    const productName = document.querySelector('#title');
    productName.innerText = data.name;
    const name = data.name;

    //adding Price
    const productPrice = document.querySelector('#price');
    productPrice.innerText = data.price;


    //adding Description
    const productDescription = document.querySelector('#description');
    productDescription.innerText = data.description;

    //colors
    const colorSelection = document.querySelector('#colors');
    let colorsPalette = data.colors;

    //looping through color array to:
    colorsPalette.forEach(color => {
        //create "option" tag in the DOM
        const colorOption = document.createElement("option");
        colorSelection.appendChild(colorOption);
        // setting element(s) of the array as value
        colorOption.value = color
        // setting element(s) of the array as html element
        colorOption.innerHTML = color
    })



}

