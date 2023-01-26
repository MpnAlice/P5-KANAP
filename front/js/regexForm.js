export function regexForm() {
    /////////////////////////////////////////REGEX

    let form = document.querySelector(".cart__order__form");

    //listening to the input with "change"
    form.email.addEventListener('change', function () {
        validEmail(this);

    });
     
    const validEmail = function (inputEmail) {
        //creation of the reg exp for email-validation
        let emailRegExp = new RegExp(
            //FIRST TIME 
            //1 @
            //+ ONE OR A LOT OF TIMES 
            //1 dot 
            //$ end of the expression
            //global flag
            '^[a-zA-z0-9.-_]+[@]{1}[a-zA-z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
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
    //
    form.firstName.addEventListener('change', function () {
        validfirstName(this)
    })

    const validfirstName = function (inputfirstName) {

        //CORREC THIS 
        //creation of the reg exp for email-validation
        let firstNameRegExp = new RegExp(
            '^[a-zA-z.-_]{1,2}'
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
    //
    form.lastName.addEventListener('change', function () {
        validlastName(this)
    })

    const validlastName = function (inputlastName) {

        //CORREC THIS 
        //creation of the reg exp for email-validation
        let lastNameRegExp = new RegExp(
            '^[a-zA-z.-_]{1,2}'
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
    //
    form.address.addEventListener('change', function () {
        validaddress(this)
    })

    const validaddress = function (inputAddress) {

        //CORREC THIS 
        //creation of the reg exp for email-validation
        let addressRegExp = new RegExp(
            '^[a-zA-z.-_]{1,2}'
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
    //
    form.city.addEventListener('change', function () {
        validcity(this)
    })

    const validcity = function (inputCity) {

        //CORREC THIS 
        //creation of the reg exp for email-validation
        let cityRegExp = new RegExp(
            '^[a-zA-z.-_]{1,2}'
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
    //
   
}


/// email's regex
export const validEmail = function (inputEmail) {
    //creation of the reg exp for email-validation
    let emailRegExp = new RegExp(
        //FIRST TIME 
        //1 @
        //+ ONE OR A LOT OF TIMES 
        //1 dot 
        //$ end of the expression
        //global flag
        '^[a-zA-z0-9.-_]+[@]{1}[a-zA-z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
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

    //CORREC THIS 
    //creation of the reg exp for email-validation
    let firstNameRegExp = new RegExp(
        '^[a-zA-z.-_]{1,2}'
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

    //CORREC THIS 
    //creation of the reg exp for email-validation
    let lastNameRegExp = new RegExp(
        '^[a-zA-z.-_]{1,2}'
    )

    let lastName = lastNameRegExp.test(inputlastName.value);
    let message = document.querySelector('#lastName').nextElementSibling;

    if (lastName) {
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

    //CORREC THIS 
    //creation of the reg exp for email-validation
    let addressRegExp = new RegExp(
        '^[a-zA-z.-_]{1,2}'
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

    //CORREC THIS 
    //creation of the reg exp for email-validation
    let addressRegExp = new RegExp(
        '^[a-zA-z.-_]{1,2}'
    )

    let city = addressRegExp.test(inputCity.value);
    let message = inputCity.nextElementSibling;
    // add the city test in the if
    if (city) {
        message.innerHTML = "nom de ville valide";
        return true

    }
    else {
        message.innerHTML = "nom de ville  invalide";
        return false
    }


}