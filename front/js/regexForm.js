/////////////////////////////REGEX CONST ready for export


/**
 * REGEXP VARIABLES
 */

let textRegex =/^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let emailRegex =/^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;
let addressRegex= /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;


/**
 * EMAIL REGEXP
 */
export const validEmail = function (inputEmail) {
    //creation of the reg exp for email-validation
    let emailRegExp = new RegExp(
        emailRegex
      
   )

   let testEmail = emailRegExp.test(inputEmail.value);
   let message = inputEmail.nextElementSibling;

   if (testEmail) {
       message.innerHTML = "";
       return true

   }
   else {
       message.innerHTML = "l'email  saisi n'est pas valide"
       return false
   }

}

/**
 * FIRST NAME REGEXP
 */
export const validfirstName = function (inputfirstName) {
   
   let firstNameRegExp = new RegExp(
    textRegex
   
       
   )

   let testfisrtName = firstNameRegExp.test(inputfirstName.value);
   let message = inputfirstName.nextElementSibling;

   if (testfisrtName) {
       message.innerHTML = "";
       return true

   }
   else {
       message.innerHTML = "le prénom saisi n'est pas valide"
       return false
   }


   
}

/**
 * LAST NAME REGEXP
 */
export const validlastName = function (inputlastName) {
   let lastNameRegExp = new RegExp(
   textRegex

   )

   let testlastName = lastNameRegExp.test(inputlastName.value);
   let message = inputlastName.nextElementSibling;

   if (testlastName) {
       message.innerHTML = "";
       return true

   }
   else {
       message.innerHTML = "le nom saisi n'est pas valide"
       return false
   }

  

}

/**
 * ADDRESS REGEXP
 */
export const validaddress = function (inputAddress) {
   
   let addressRegExp = new RegExp(
  addressRegex
  
   )

   let address = addressRegExp.test(inputAddress.value);
   let message = inputAddress.nextElementSibling;

   if (address) {
       message.innerHTML = "";
       return true

   }
   else {
       message.innerHTML = "l'addresse saisie n'est pas valide"
       return false
   }

  


}

/**
 * CITY REGEXP
 */
export const validcity = function (inputCity) {
   
   let cityRegExp = new RegExp(
  textRegex
      
   )

   let city = cityRegExp.test(inputCity.value);
   let message = inputCity.nextElementSibling;

   if (city) {
       message.innerHTML = "";
       return true

   }
   else {
       message.innerHTML = "le nom de ville saisi n'est pas valide";
       return false
   }



   

}


/***********************
 * 
 * REGEX FUNCTION
 * 
 ************************ */



export function regexForm() {

    let form = document.querySelector(".cart__order__form");
    //FIRST NAME

    form.firstName.addEventListener('change', function () {
        validfirstName(this)
    })
    //LAST NAME

    form.lastName.addEventListener('change', function () {
        validlastName(this)
    })
    //ADDRESS
    form.address.addEventListener('change', function () {
        validaddress(this)
    })
    //CITY

    form.city.addEventListener('change', function () {
        validcity(this)
    })
    //EMAIL

    form.email.addEventListener('change', function () {
        validEmail(this)
    })


    //

}

