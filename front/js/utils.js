//api's url
export const apiUrl = 'http://localhost:3000/api/products';
//extracting the id of the product from the end of the url's page
export const queryString_url = window.location.search
// easy method to separate the id from the string
export const id = queryString_url.slice(4)
//products's url
export const productUrl = (`http://localhost:3000/api/products/${id}`);
