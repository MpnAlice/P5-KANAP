import { productUrl, paramId, queryString_url, createElement } from "./utils.js";

/**
 * retrieving the product's data from  the api with fetch
 */
function fetchProductData(){
    fetch(productUrl)
    .then((res) => res.json())
    .then((data) => {
       implementingProductDetails(data);
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

function implementingProductDetails (data)  {
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
        const options = document.createElement("option");
        colorSelection.appendChild(options);
        // setting element(s) of the array as value
        options.value = color
        // setting element(s) of the array as html element
        options.innerHTML = color
    })

}
/**
 * ADDING PRODUCTS TO THE BASKET
 */ 
 //initializing the button element present in the html
 const addToCartBtn = document.querySelector('#addToCart')
 addToCartBtn.addEventListener("click", (event)  =>{
    event.preventDefault();
    selectedOptions();


 }
 )


  // setting the options of the selection elements in a function
  function selectedOptions(){
    const quantity = document.getElementById('quantity')
    const quantityChoice = parseInt(quantity.value)
    const colorChoice = document.getElementById('colors');
    const selectedColor = colorChoice.options[colorChoice.selectedIndex].value
    if(selectedColor == "" || quantityChoice == 0){
        alert("veuillez remplir tous les champs ")
    }
    if( quantityChoice > quantity.max|| quantityChoice < quantity.min){
        alert("veuillez  choisir une quantité comprise entre 1 et 100")

    }
    console.log( quantityChoice)

 }



 








