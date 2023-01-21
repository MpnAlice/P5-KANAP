import { productUrl, id, queryString_url} from "./utils.js";
//fetching the product's info from the new url 
async function getProducts() {
    const response = await fetch(productUrl)
    const product = await response.json();

    //making image
    const ProductImage = document.createElement('img');
    ProductImage.src = product.imageUrl;
    ProductImage.alt = product.altTxt;
    const url = product.imageUrl
    const imgParent = document.querySelector('.item__img');
    imgParent.appendChild(ProductImage);

    //adding Name
    const productName = document.querySelector('#title');
    productName.innerText = product.name;
    const name = product.name;

    //adding Price
    const productPrice = document.querySelector('#price');
    productPrice.innerText = product.price;
   

    //adding Description
    const productDescription = document.querySelector('#description');
    productDescription.innerText = product.description;
    
    //colors
    const colorSelection = document.querySelector('#colors');
    let colorsPalette = product.colors;

    //looping through color array to:
    colorsPalette.forEach(color => {
        //create "option" tag in the DOM
        const colorOption = document.createElement("option");
        colorSelection.appendChild(colorOption);
        // setting element(s) of the array as value
        colorOption.value = color
        // setting element(s) of the array as html element
        colorOption.innerHTML = color
    });


    //initializing the button
    const addButton = document.querySelector("#addToCart");
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        //
        const colorCall = document.querySelector("#colors");
        //assigning the value of the id 'colors' to color choice
        const colorChoice = colorCall.value;
        //
        const quantityCall = document.querySelector("#quantity");
        //assigning the value of the id 'colors' to color choice
        const quantityChoice = Number(quantityCall.value);
        
        //creating an array of product
        let productArray ={
            "id": id,
            "quantity":quantityChoice,
            "color": colorChoice,
            "url":url,
            "name": name,
            //"price":price
        }
        //console.log(productArray);

        //handling local storage//
      
    
        //saving the basket in the local storage
        function saveBasket(basket){
            localStorage.setItem("basket", JSON.stringify(basket));
        }
       
        //getting the item with the key "basket"
        function getBasket(){
            let basket = localStorage.getItem("basket");
            //if the basket is empty
            if (basket == null) {
                return[] 
            } else {
            return JSON.parse(basket);
            }
             
        }


        //adding the productArray to the "basket"
        function addtoBasket(productArray){
            // calling the parsed response of the basket as basket
            let basket = getBasket();
            //finding the product in basket by id
            let productInBasket = basket.find((p) =>{ return p.id == productArray.id  &&  p.color == productArray.color})
            //if the product in basket is different from undefined,color and id are the same
            console.log(productInBasket)
            if (productInBasket != undefined) {
                //correction
                const productInBasketIndex =basket.indexOf(productInBasket)
                //  
                productInBasket.quantity += productArray.quantity;
                //
                productArray.quantity = quantity;
               basket[productInBasketIndex]=productInBasket;
              
            } else {
                //default quantity
               
                //pushing the product array in the basket
                basket.push(productArray);
            }
          
            //new basket registration
            saveBasket(basket)
        }
        addtoBasket(productArray);
     

        //redirecting to the cart's page
        window.location.href='./cart.html'

    })

}
//calling the function
getProducts();








