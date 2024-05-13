const dropdowns = document.querySelectorAll("select");
let btn = document.querySelector(".btn");
const formCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let exchangeRate = document.querySelector(".msg")

for (let select of dropdowns) {
    for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
    } else if(select.name === "to" && currCode === "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
    }
    select.addEventListener("change" , (evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;

}

btn.addEventListener("click" , async(evt) =>{
    evt.preventDefault();
    let newAmount = document.querySelector(".amount input");
    let amtVal = newAmount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        newAmount.value = "1";
    }
    const CONVERT_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_V1J1vkojzsmCPMGWPbkJpVYHKWn2uBimu4oQsizh&currencies=${toCurr.value}&base_currency=${formCurr.value}`;
    let response = await fetch(CONVERT_URL);
    let data = await response.json();
    let rate = data.data[toCurr.value];
    let newRate = amtVal * rate
    exchangeRate.innerText = newRate;
});