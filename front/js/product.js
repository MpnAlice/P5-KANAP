//extracting the id of the product from the end of the url's page
const queryString_url = window.location.search
// easy method to separate the id from the string
const id = queryString_url.slice(4)

//fetching the product's info from the new url 
let productUrl = (`http://localhost:3000/api/products/${id}`);
async function getData() {
    const response = await fetch(productUrl)
    const product = await response.json();
    console.log(product)

    //making image
    const ProductImage = document.createElement('img');
    ProductImage.src = product.imageUrl;
    ProductImage.alt = product.altTxt;
    const imgParent =document.querySelector('.item__img');
    imgParent.appendChild(ProductImage);

    //adding Name
    const productName = document.querySelector('#title');
    productName.innerText = product.name;

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
     colorOption.innerHTML= color
    });

    
    //initializing the button
    const addButton =document.querySelector("#addToCart");
    addButton.addEventListener('click' ,(event) =>{
        event.preventDefault();
        //
        const colorCall =document.querySelector("#colors");
        //assigning the value of the id 'colors' to color choice
        const colorChoice = colorCall.value;

        //quantity from api
        const quantity = document.querySelector("#quantity");
        const quantityChoice = quantity.value

        //product object
        let product  ={
          "id":id,
          "color":colorChoice,
          "quantity":quantityChoice
        }
    
    })
    
   
    
}
//calling the function
getData();








