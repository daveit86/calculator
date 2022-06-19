console.log("loaded!");

//Debug stuff
let isDebug=true;
function debugConsoleLog(msg,text)
{
    if(isDebug)
    {
        if(Array.isArray(text))
        {
            console.log(msg+":");
            console.table(text);
        }
        else
        {
            console.log(msg+":");
            console.log(text);
        }
    }
}

//Useful variables
let isOpLoaded=false;
let numTop=undefined;
let numBottom=undefined;
let tempOp=undefined;

//GUI elements assignment
const displayBottom=document.querySelector("#display .bottom");
const displayTopNum=document.querySelector("#display .top .number");
const displayTopOp=document.querySelector("#display .top .operator");
const clearBtn=document.querySelector("#clear");
const deleteBtn=document.querySelector("#delete");
const digitBtns=Array.from(document.querySelectorAll(".digit"));
const operatorBtns=Array.from(document.querySelectorAll(".operator"));
const equalBtn=document.querySelector(".equal");

//var check block
debugConsoleLog("Bottom display", displayBottom);
debugConsoleLog("Top display number",displayTopNum);
debugConsoleLog("Top display operator",displayTopOp);
debugConsoleLog("Clear button",clearBtn);
debugConsoleLog("Delete button",deleteBtn);
debugConsoleLog("Digit buttons",digitBtns);
debugConsoleLog("Operator buttons",operatorBtns);
debugConsoleLog("Equal button",equalBtn);


//Buttons functions
function clear_btn()
{
    console.log("Clearing display!");
    numBottom=undefined;
    numTop=undefined;
    tempOp=undefined;
    update_display();
}

function delete_btn()
{
    console.log("Deleting last digit!");
    let text=displayBottom.textContent;
    numBottom=parseFloat(text.slice(0,text.length-1)); 
    if(isNaN(numBottom))
    {
        numBottom=undefined;
    }
    update_display();
    
}

function digit(e)
{
    let value=e.target.getAttribute("value");
    console.log(`Pressed digit ${value}!`);
    if(numBottom==undefined)
    {
        numBottom=parseFloat(value);
        update_display();
    }
    else
    {
        let text=numBottom.toString();
        text+=value;
        numBottom=parseFloat(text);
        update_display();
    }

}

function operator(e)
{
    let value=e.target.getAttribute("value");
    console.log(`Pressed operator ${value}!`);
    tempOp=value;
    update_display();
    let result=0;
    if(numBottom!=undefined)
    {
        if(numTop==undefined)
        {
            numTop=numBottom;
            update_display();
        }
        else
        {
            result=calculate(value,numTop,numBottom);
            tempOp=value
            numBottom=result;
            numTop=result;
            update_display();
        }
        numBottom=undefined;
    }
}

function equal(e){
    let result=0;
    if(numTop!=undefined&&numBottom!=undefined&&tempOp!=undefined)
    {
        result=calculate(tempOp,numTop,numBottom);
        numBottom=result;
        numTop=result;
        tempOp=undefined;
        update_display();
        numBottom=undefined;
    }
}

function calculate(op,num1,num2)
{
    console.log(`Calculating ${num1} ${op} ${num2}`);
    switch (op){
        case '+': return num1+num2;
        break;
        case '-': return num1-num2;
        break;
        case 'x': return num1*num2;
        break;
        case ':': return num1/num2;
        break;
    }
}

//Other functions
function update_display()
{
    if(displayTopNum.textContent==undefined)
    {
        displayTopNum.textContent="";
    }
    else
    {
        displayTopNum.textContent=numTop;
    }

    if(displayBottom.textContent==undefined)
    {
        displayBottom.textContent="";
    }
    else
    {
        displayBottom.textContent=numBottom;
    }
    
    if(displayTopOp.textContent==undefined)
    {
        displayTopOp.textContent="";
    }
    else
    {
        displayTopOp.textContent=tempOp;
    }
}

//Event listeners
clearBtn.addEventListener("click",clear_btn);
deleteBtn.addEventListener("click",delete_btn);
digitBtns.forEach(element => {
    element.addEventListener("click",digit);
});
operatorBtns.forEach(element => {
    element.addEventListener("click",operator);
});
equalBtn.addEventListener("click",equal);
