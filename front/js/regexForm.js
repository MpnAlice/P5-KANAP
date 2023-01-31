////////////////////////////////////////////////////////REGEX CONST 


/// email's regex
export const validEmail = function (inputEmail) {
    //creation of the reg exp for email-validation
    let emailRegExp = new RegExp(
      
       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

   )

   let testEmail = emailRegExp.test(inputEmail.value);
   let message = inputEmail.nextElementSibling;

   if (testEmail) {
       message.innerHTML = "Adresse Valide";
       return true

   }
   else {
       message.innerHTML = "Adresse Non valide"
       return false
   }

}


// firstname's regex
export const validfirstName = function (inputfirstName) {
   
   let firstNameRegExp = new RegExp(
       /^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$/
       
   )

   let testfisrtName = firstNameRegExp.test(inputfirstName.value);
   let message = inputfirstName.nextElementSibling;

   if (testfisrtName) {
       message.innerHTML = "Prénom Valide";
       return true

   }
   else {
       message.innerHTML = "Prénom invalide"
       return false
   }


   
}

// lastname's regex
export const validlastName = function (inputlastName) {
   let lastNameRegExp = new RegExp(
       /^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$/
   )

   let testlastName = lastNameRegExp.test(inputlastName.value);
   let message = inputlastName.nextElementSibling;

   if (testlastName) {
       message.innerHTML = "Nom Valide";
       return true

   }
   else {
       message.innerHTML = "Nom invalide"
       return false
   }

  

}

// adress's regex
export const validaddress = function (inputAddress) {
   
   let addressRegExp = new RegExp(
       /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*$/
   )

   let address = addressRegExp.test(inputAddress.value);
   let message = inputAddress.nextElementSibling;

   if (address) {
       message.innerHTML = "Adresse Valide";
       return true

   }
   else {
       message.innerHTML = "Adresse invalide"
       return false
   }

  


}

//city's regex
export const validcity = function (inputCity) {
   
   let cityRegExp = new RegExp(
       /^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$/
   )

   let city = cityRegExp.test(inputCity.value);
   let message = inputCity.nextElementSibling;

   if (city) {
       message.innerHTML = "nom de ville valide";
       return true

   }
   else {
       message.innerHTML = "nom de ville  invalide";
       return false
   }



   

}



/////////////////////////////////////////REGEX FUNCTION





export function regexForm() {

    let form = document.querySelector(".cart__order__form");

   
    form.firstName.addEventListener('change', function(){
        validfirstName(this)
    })

    
    form.lastName.addEventListener('change', function(){
        validlastName(this)
    })
    form.address.addEventListener('change', function(){
        validaddress(this)
    })



    form.city.addEventListener('change', function(){
        validcity(this)
    })

    form.email.addEventListener('change', function(){
        validEmail(this)
    })



   

   
  
   
    
  //

}

