import { productUrl, paramId, queryString_url, createElement } from "./utils.js";

/**
 * retrieving the product's data from  the api with fetch
 */
function fetchProductData(){
    fetch(productUrl)
    .then((res) => res.json())
    .then((data) => {
       implementingProductDetails(data);
       addOnclick(data)
    
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

function addOnclick(data) {



    const addToCartBtn = document.querySelector('#addToCart')
    addToCartBtn.addEventListener("click", (event) => {

        // setting the options of the selection elements in a function
        const quantity = document.getElementById('quantity')
        const selectedQuantiy = parseInt(quantity.value)
        const colorChoice = document.getElementById('colors');
        const selectedColor = colorChoice.options[colorChoice.selectedIndex].value
         //
        event.preventDefault();
        //
        
        /**
         * creating an array with the color,quantity and id
         */

        let obj = {
            id : data._id,
            color: selectedColor,
            quantity:selectedQuantiy,

        }
      
        //
     
        if (selectedColor == "") {
            alert("Merci d'indiquer la couleur choisie pour votre produit ")
        }

        if (selectedQuantiy > quantity.max || selectedQuantiy< quantity.min) {
            alert("veuillez  choisir une quantité comprise entre 1 et 100 pour votre produit")

        }
        
        else (
            addToBasket(obj)
           
        )
       
       

    });

}


function addToBasket(obj) {
    let basket = JSON.parse(localStorage.getItem("localproduct")) || [];

    //
    let foundProduct = basket.find((item) => item.id === obj.id && item.color == obj.color)

    if (foundProduct) {

        foundProduct.quantity += obj.quantity;
        basket = basket.map((item) => {
            if (obj.id == item.id && obj.color == item.color) {
                return foundProduct
            }

            return item;
        });
    } else {
        basket.push(obj);

    }
    localStorage.setItem('localproduct', JSON.stringify(basket))
    console.log(basket)

}

        
        

    
//















 
