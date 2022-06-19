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
const allBtns=Array.from(document.querySelectorAll(".btn"));
const equalBtn=document.querySelector(".equal");

//Audio
const clickAudio=document.querySelector(".audio");

//var check block
debugConsoleLog("Bottom display", displayBottom);
debugConsoleLog("Top display number",displayTopNum);
debugConsoleLog("Top display operator",displayTopOp);
debugConsoleLog("Clear button",clearBtn);
debugConsoleLog("Delete button",deleteBtn);
debugConsoleLog("Digit buttons",digitBtns);
debugConsoleLog("Operator buttons",operatorBtns);
debugConsoleLog("Equal button",equalBtn);
debugConsoleLog("Click audio clip",clickAudio);


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

function digit(value)
{
    console.log(`Pressed digit ${value}!`);
    if(numBottom==undefined)
    {
        if(value==".")
        {
            numBottom="0.";
        }
        else
        {

            numBottom=value;
        }
        
        update_display();
    }
    else
    {
        if(value==".")
        {
            if(!numBottom.includes("."))
            {
                numBottom+=value;
            }
        }
        else
        {
            numBottom+=value;
        }
        
        update_display();
    }

}

function operator(value)
{
    console.log(`Pressed operator ${value}!`);
    let oldOP=tempOp;
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
            result=calculate(oldOP,numTop,numBottom);
            tempOp=value
            numBottom=result;
            numTop=result;
            update_display();
        }
        numBottom=undefined;
        tempOp=value;
    }
}

function equal(){
    let result=0;
    if(numTop!=undefined&&numBottom!=undefined&&tempOp!=undefined)
    {
        result=calculate(tempOp,numTop,numBottom);
        numBottom=result.toString();
        numTop=result;
        tempOp=undefined;
        update_display();
        numBottom=undefined;
    }
}

function calculate(op,num1,num2)
{
    num1=parseFloat(num1);
    num2=parseFloat(num2);
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
    element.addEventListener("click",(e)=>{
    digit(e.target.getAttribute("value"));
    });
});
operatorBtns.forEach(element => {
    element.addEventListener("click",(e)=>{
        operator(e.target.getAttribute("value"));
    });
});
equalBtn.addEventListener("click",equal);
allBtns.forEach(element => {
    element.addEventListener("click",(e)=>{
        clickAudio.currentTime=0;
        clickAudio.play();
    })
})


//Keyboard listener
window.addEventListener('keydown',(e)=>{
    debugConsoleLog("Key listener code",e.keyCode);
    switch(e.keyCode){
        case 48: case 96: digit("0");
        break;
        case 49: case 97: digit("1");
        break;
        case 50: case 98: digit("2");
        break;
        case 51: case 99: digit("3");
        break;
        case 52: case 100: digit("4");
        break;
        case 53: case 101: digit("5");
        break;
        case 54: case 102: digit("6");
        break;
        case 55: case 103: digit("7");
        break;
        case 56: case 104: digit("8");
        break;
        case 57: case 105: digit("9");
        break;
        case 111: operator(":");
        break;
        case 106: operator("x");
        break;
        case 107: operator("+");
        break;
        case 109: operator("-");
        break;
        case 110: case 190: digit(".");
        break;
        case 8:  delete_btn();
        break;
        case 46:  clear_btn();
        break;
        case 110: case 190: digit(".");
        break;
        case 13: equal();
        break;
    }
})