//extracting the id of the product from the end of the url's page
const queryString_url= window.location.search;
// easy method to separate the id from the string
const id =queryString_url.slice(4)

//
let productUrl = (`http://localhost:3000/api/products/${id}`)
fetch(productUrl)
.then(response => response.json())
.then(res => console.log(res))
//