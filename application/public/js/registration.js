function validLook(given){
    if(given.checkValidity()){
        given.classList.add("valid");
        given.classList.remove("invalid");
    } else {
        given.classList.add("invalid");
        given.classList.remove("valid");
    }
}
//connects the js to the html by grabbing the CheckUserName field, refreshes as you type! (made possible by "input")
document.getElementById("uname").addEventListener("input", CheckUserName);

function CheckUserName() { //name of function
    let inputtxt = document.getElementById("uname");
    
    var parts = /^[a-zA-Z]/;//this makes sure the first part is a letter but doesnt allow numbers
    var partsNumb = /^[a-zA-Z]+[0-9]/; //needs  number or it doesnt work
    if(inputtxt.value.match(parts || partsNumb)) { //doesnt need number but allowes it because of the or ||
        inputtxt.setCustomValidity("");// changes the field to valid
        validLook(inputtxt);
        return true;
    }
    else{ 
        inputtxt.setCustomValidity("Needs to start with a letter and be 3 characters long");//changes the feild to invalid
        validLook(inputtxt);
        return false;
    }
}

document.getElementById("pawrd").addEventListener("input", CheckPassword);

function CheckPassword() {
    let inputtxt = document.getElementById("pawrd");
    var small = /[a-z]/g;
    var big = /[A-Z]/g;
    var num = /[0-9]/;
    var char = /[\W]/g;
    if(inputtxt.value.match(small && big && num && char)){
        inputtxt.setCustomValidity("");// changes the field to valid
        validLook(inputtxt);
        return true;
    }
    else{ 
        inputtxt.setCustomValidity("8 or more characters AND contains at least 1 upper case letter AND 1 number and 1 of the following special characters: / * - + ! @ # $ ^ & ~ [ ] ");//changes the feild to invalid
        validLook(inputtxt);
        return false;
    }

}

document.getElementById("pawrdc").addEventListener("input", CheckConfirmPassword);

function CheckConfirmPassword(){
    let paswrd = document.getElementById("pawrd");
    let conpaswrd = document.getElementById("pawrdc");
    if(paswrd.value == conpaswrd.value){
        conpaswrd.setCustomValidity("");// changes the field to valid
        validLook(conpaswrd);
        return true;
    }
    else{ 
        conpaswrd.setCustomValidity("Must be the same as Password");//changes the feild to invalid
        validLook(conpaswrd);
        return false;
    }
}
document.getElementById("emil").addEventListener("input", CheckEmail);

function CheckEmail(){
    let email = document.getElementById("emil");
    validLook(email);
}