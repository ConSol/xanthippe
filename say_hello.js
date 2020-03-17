
 const sampleFunction = function createPassword (number){
     var randomNumbers = [];
     password = "";
     passwordCreated = false;

     for(var i = 0; i < number; i++){
        randomNumbers[i] = parseInt(Math.random()*10);
     }

     randomNumbers.forEach(element => {
         password += element.toString();
        });

     if(password.length == number){
        passwordCreated = true;
     }   

     return passwordCreated;
};

module.exports = sampleFunction;