const inputLength = document.querySelector(".input-length");
const passwordLength = document.querySelector(".password-length");
const form = document.querySelector(".form-container");
const password = document.querySelector(".password");
const buttonCopy = document.querySelector(".button");

const API = "https://random-word-api.herokuapp.com/all";

const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
const numbers =[1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];
let words = [];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

function generatePassword(passwordLengthChosen, checkBoxChosen) {

    let arrayOfArrays = [];
    // switch(true) {
    //   case checkBoxChosen.letters: 
    //           arrayOfArrays.push(letters);
    //   break;
    //   case checkBoxChosen.numbers: 
    //           arrayOfArrays.push(numbers);
    //   break;
    //   case checkBoxChosen.symbols: 
    //           arrayOfArrays.push(symbols);
    //   break;    
    //   case checkBoxChosen.words: 
    //           arrayOfArrays.push(words);
    //   break;
    // }

    // switch(true) {
    //   case checkBoxChosen.letters: 
    //   case checkBoxChosen.numbers: 
    //   case checkBoxChosen.symbols: 
    //   case checkBoxChosen.words: 
    //           arrayOfArrays.push(letters);
      
    //           arrayOfArrays.push(numbers);
      
    //           arrayOfArrays.push(symbols);
      
    //           arrayOfArrays.push(words);
    //   break;
    // }
    
    if (checkBoxChosen.letters) {
        arrayOfArrays.push(letters);
      }

    if (checkBoxChosen.numbers) {
      arrayOfArrays.push(numbers);
    }

    if (checkBoxChosen.symbols) {
      arrayOfArrays.push(symbols);
    }

    if (checkBoxChosen.words) {
      arrayOfArrays.push(words);
    }

    let strongPassword = [];
    for (let i = 0; i < passwordLengthChosen; i++) {
      const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)];
      const randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)];
      strongPassword.push(randomCharacter);
    }

    if (checkBoxChosen.words) {
      strongPassword = strongPassword.join("-");
    } else {
      strongPassword = strongPassword.join("");
    }


    password.innerText = strongPassword;
}

function fetchData(API) {
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      words = data
    });
}

fetchData(API);

function CopyToClipboard(id)
{
  const r = document.createRange();
  r.selectNode(document.querySelector(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  if (password.innerText == 0) {
      swal("Primero genera una contraseña");
      } else {
        window.navigator.clipboard.writeText(r);
        swal("Copiaste la contraseña");
        window.getSelection().removeAllRanges();
        
      }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formElement = event.target;
    const passwordLength = formElement.length.value;

    const checks = {
      letters: formElement.letters.checked,
      words: formElement.words.checked,
      numbers: formElement.numbers.checked,
      symbols: formElement.symbols.checked,
    };

    console.log(Object.keys(checks))
console.log(Object.values(checks))
console.log(Object.values(checks).forEach)



    // const values = [];
    
//     checks.forEach((checkBox) => {
//       values.push(checkBox.value);
      
//     })
// alert(values);
    if((checks.letters==false) && (checks.words==false) && (checks.numbers==false) && (checks.symbols==false))
    //if((Object.values(checks)).forEach==false)
    {
      alert("Elige primero una de las opciones")
      password.innerText = " ";
    } 
      else if 
        ((checks.words==true) && ((checks.letters==true) || (checks.numbers==true) || (checks.symbols==true)))
        {
          alert("No puedes mezclar palabras con el resto de opciones")
          formElement.letters.checked = false;
          formElement.numbers.checked = false;
          formElement.symbols.checked = false;
          formElement.words.checked = false;
          password.innerText = " ";
        }  else {
                  generatePassword(passwordLength, checks);
    }  

    buttonCopy.disabled = false;
  });
  
buttonCopy.addEventListener("click", () => {
    CopyToClipboard(".password");
    return false;
  });


inputLength.addEventListener("input", (e) => {
  passwordLength.innerText = e.target.value;
});
  



