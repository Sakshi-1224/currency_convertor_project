const baseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
const dropdown=document.querySelectorAll(".item2 select");
console.log(dropdown);
for(let select of dropdown){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        select.append(newoption);
        
    }
    select.addEventListener("change",function (event){
        console.log(event.target);
        updateflag(event.target);
    });
    
    function updateflag(selects){
         console.dir(selects);
           let currcode=selects.value;
           console.log(currcode);
           let countrycode=countryList[currcode];
           let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
           console.log(newsrc);
           const t=selects.parentElement.querySelector("img");
           console.log(t);
           t.src=newsrc;
    }
    let fromcurr=document.querySelector(".from select");
    let tocurr=document.querySelector(".to select");
    
    let button=document.querySelector(".item4 button");
    button.addEventListener("click",async function (event){
          event.preventDefault();
          let amount=document.querySelector(".item1 input");
          console.log(amount.value);
          let amt=amount.value;
          if(amt==="" || amt<=0){
              alert("Enter A Valid Amount");
              let item3=document.querySelector(".item3 h1");
           item3.innerText="1 USD = 80 INR";
          }
          else{
           console.log(fromcurr.value,tocurr.value);
           const url = `${baseURL}/${fromcurr.value.toLowerCase()}.json`;
           let response=await fetch(url);
           console.log(response);
           let responsejson = await response.json();
           console.log(responsejson);
           let rate = responsejson[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
           console.log(rate);

           let newrate=amt*rate;
           console.log(newrate);
           let item3=document.querySelector(".item3 h1");
           item3.innerText=`${amt} ${fromcurr.value} = ${newrate} ${tocurr.value}`;
          }
          
    });
        
}