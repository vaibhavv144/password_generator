const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthnumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copy_btn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data_cpy]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generatebutton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='!@#$%^&*()_+-=,./<>?;\:"|{}[]"'
let password="";
let passwordLength=10;
let checkCount=0;

handelSlider();
setIndicator("#ccc");
//
//iss function ka kaam h password length ko UI pr reflect karana
function handelSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText= passwordLength;
}
//ye colour fill karega box m
function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow
}
function getRandomInt(min,max){
   return Math.floor(Math.random()*(max-min))+min;

}
function generateRandomNumber(){
    return getRandomInt(0,9);
}

function generateLowerCase(){
   return String.fromCharCode(getRandomInt(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRandomInt(65,91));
}
function generateSymbols(){
    const randNum=getRandomInt(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numberCheck.checked) hasNum=true;
    if(symbolCheck.checked) hasSym=true;

    if(hasUpper && hasLower &&(hasNum||hasSym)&&passwordLength>=8){
        setIndicator("#0f0");

    }else if(
        (hasLower ||hasUpper)&&
        (hasNum||hasSym)&&
        passwordLength>=6

    ) {
        setIndicator("#ff0");
    } else{
        setIndicator("#f00");
    }
        
}

function sufflePassword(array){
    //fisher yates method
 for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random() * (i+1));
    const temp=array[i];
    array[i]=array[j];
    array[j]=temp;
 }
 let str="";
 array.forEach((el)=>(str+=el));
 return str;
}
async function copyCOntent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }//to make copy spam visible

        copyMsg.classList.add("active");

    setTimeout( ()=>{
        classList.remove("active");
    } ,2000 );

   

    }
    function handleCheckBoxChange(){
          checkCount = 0;
          allCheckBox.forEach( (checkbox) => {
            if(checkbox.checked)
            checkCount++;
          })

          if(passwordLength<checkCount){
            passwordLength=checkCount;
            handelSlider();

          }
        }


    allCheckBox.forEach( (checkbox) => {
        checkbox.addEventListener('change',handleCheckBoxChange);
    })


    inputSlider.addEventListener('input',(e)=>{
        passwordLength=e.target.value;
        handelSlider();
    })


    copy_btn.addEventListener('click',()=>{
        if(passwordDisplay.value)
        copyCOntent();
    })

    generateBtn.addEventListener('click',()=>{
      //none of the checkbox is selected
      if(checkCount == 0) 
        return;
      
      if(passwordLength < checkCount){
        passwordLength = checkCount;
        handelSlider();
      }

      //remove old password
      console.log("star");
      password="";
   /*   if(uppercaseCheck.checked){
        password+=generateUpperCase();
      }
      if(lowercaseCheck.checked){
        password+=generateLowerCase();
      }
      if(symbolCheck.checked){
        password+=generateSymbols();
      }
      if(numberCheck.checked){
        password+=generateRandomNumber();
    }*/

      let funcArr = [];
      if(uppercaseCheck.checked)
      funcArr.push(generateUpperCase);

      if(lowercaseCheck.checked)
      funcArr.push(generateLowerCase);

      if(numberCheck.checked)
      funcArr.push(generateRandomNumber);

      if(symbolCheck.checked)
      funcArr.push(generateSymbols); 

      //compulsory code to add i.e number of character which are ticked
      for (let i = 0; i < funcArr.length; i++) {
            password += funcArr[i]();
      }
      console.log("compul done");


      //remaining addition
      for (let i = 0; i < passwordLength- funcArr.length; i++) {
      
        let randInd=getRandomInt(0 , funcArr.length);
        console.log("rand idx"+randInd);
        password += funcArr[randInd]();
      }
      console.log("rem done");


      //shuffle password
      password = sufflePassword(Array.from(password));
      console.log("suffling done");

      //shown in ui
     passwordDisplay.value=password;
     console.log("ui done");


     //cacl strength
     calcStrength();
})

    
    
