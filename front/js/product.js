//extracting the id of the product from the end of the url's page
const queryString_url= window.location.search
// easy method to separate the id from the string
const id =queryString_url.slice(4)

//fetching the product's info from the new url 
let productUrl = (`http://localhost:3000/api/products/${id}`)
fetch(productUrl)
.then(response => response.json())
.then((data) =>{

    // image
    const imgParent = document.querySelector('.item__img')
    const img = document.createElement('img')
    img.alt = data.altTxt
    img.src = data.imageUrl;
    imgParent.appendChild(img)

    //name
    const productName =document.querySelector("#title")
    productName.innerHTML = data.name;
    
    //price
    const productPrice =document.querySelector("#price")
    productPrice.innerHTML = data.price;
      
    //description
    const productDescription =document.querySelector("#description")
    productDescription.innerHTML = data.description;

    //colors selection
    let colorSelection = document.querySelector("#colors");
    let colorChoice = data.colors
    colorChoice.forEach(color => {
        const option = document.createElement('option')
        option.value = color
        option.text = color
        colorSelection.appendChild(option)
      

    });

    //initializing the Addto cart button
    const addButton = document.querySelector('#addToCart');
    addButton.addEventListener('click', ()=>{})

    
    

})


