import { apiUrl} from "./utils.js";
//extracting the id form the local page.
const queryString_url_id= window.location.search;
// easy method to separate the id from the string
const id =queryString_url_id.slice(4)
//
let productUrl = (`http://localhost:3000/api/products/${id}`)

fetch(productUrl)
.then(response => response.json())
.then(res => console.log(res))
