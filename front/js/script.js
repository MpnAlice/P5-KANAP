import {apiUrl} from "./utils.js";

 //fetching data from the api's url with a simplified async function
 async function getData(){                         
    const response = await fetch(apiUrl)
    const data = await response.json();


    //looping through the fetched array to create an article for each elements 
    for (let i = 0; i< data.length; i++){

    //anchor and article for each elements,
    //added in the DOM with .createElement and .appendchild
    let a = document.createElement("a")
    a.href ="./product.html?id="+ data[i]._id
    let items =document.getElementById("items")
    items.appendChild(a)
    //
    let article = document.createElement("article")
    a.appendChild(article)
     
    //article's content for each elements 
    //added in the DOM by modifying the innerHtml of the appended article
    article.innerHTML=(`
              <img src= ${data[i].imageUrl} alt="${data[i].altTxt}">
              <h3 class="productName">${data[i].name}</h3>
              <p class="productDescription">${data[i].description}</p>
    `
    )
}

}
//calling the function
getData();
