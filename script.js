document.addEventListener("DOMContentLoaded",()=>{
  const input=document.getElementById("inputbox");
  const buttons=document.querySelectorAll("button");
  const historyList=document.getElementById("historyList");

  let history=[];

  // Button click handling
  buttons.forEach(btn=>{
    btn.addEventListener("click",()=>handleInput(btn.textContent));
  });

  // Keyboard support
  document.addEventListener("keydown",(e)=>{
    const key=e.key;

    if("0123456789+-*/().".includes(key)){
      handleInput(key);
    }
    else if(key==="Enter"){
      handleInput("=");
    }
    else if(key==="Backspace"){
      handleInput("DEL");
    }
    else if(key==="Escape"){
      handleInput("AC");
    }
  });

  function handleInput(value){
    switch(value){

      case "AC":
        input.value="";
        break;

      case "DEL":
        input.value=input.value.slice(0,-1);
        break;

      case "=":
        calculate();
        break;

      case "sin":
      case "cos":
      case "tan":
      case "log":
        input.value+=value+"(";
        break;

      case "√":
        input.value+="sqrt(";
        break;

      case "xʸ":
        input.value+="^";
        break;

      default:
        input.value+=value;
    }
  }

  function calculate(){
    try{
      let exp=input.value;

      // Replace custom operators
      exp=exp.replace(/√/g,"sqrt");
      exp=exp.replace(/\^/g,"**");

      // Math function mapping
      exp=exp.replace(/sin/g,"Math.sin");
      exp=exp.replace(/cos/g,"Math.cos");
      exp=exp.replace(/tan/g,"Math.tan");
      exp=exp.replace(/log/g,"Math.log10");
      exp=exp.replace(/sqrt/g,"Math.sqrt");

      const result=eval(exp);

      saveHistory(input.value,result);
      input.value=result;
    }catch{
      input.value="Error";
    }
  }

  function saveHistory(exp,res){
    history.unshift(`${exp} = ${res}`);
    if(history.length>10) history.pop();
    renderHistory();
  }

  function renderHistory(){
    historyList.innerHTML="";
    history.forEach(item=>{
      const li=document.createElement("li");
      li.textContent=item;
      historyList.appendChild(li);
    });
  }
});
