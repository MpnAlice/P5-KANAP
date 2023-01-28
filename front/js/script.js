import { apiUrl } from "./utils.js";

//fetching data from the api's url with a simplified async function
async function getData() {
    const response = await fetch(apiUrl)
    const data = await response.json();


    //looping through the fetched array to create an article for each elements 
    for (let i = 0; i < data.length; i++) {

        //anchor and article for each elements,
        //added in the DOM with .createElement and .appendchild
        let a = document.createElement("a")
        a.href = "./product.html?id=" + data[i]._id
        let items = document.getElementById("items")
        items.appendChild(a)
        //
        let article = document.createElement("article")
        a.appendChild(article)

        //
        let img = document.createElement("img")
        img.src = data[i].imageUrl
        img.alt = data[i].altTxt
        //
        let h3 = document.createElement("h3")
        h3.setAttribute("class",'productName')
        h3.innerText = data[i].name
        //
        let p = document.createElement('p') 
        p.setAttribute("class", 'prouctDescription')
        p.innerText = data[i].description
       
        
        //creating an array with all the article's elements
        //and adding them to the DOM with the appendchil method
        let articleInfos =[img, h3, p];
        articleInfos.forEach(element => {

         article.appendChild(element)
            
        });
      
    }

}
//calling the function
getData();
