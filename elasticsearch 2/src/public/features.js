const buttonDrug = document.querySelector('[button-umls]');


const buttonElement = document.createElement("button");
// buttonElement.innerHTML = "";
buttonElement.innerHTML = "UMLS";
buttonElement.className = "btn btn-primary";
buttonElement.addEventListener("click", function () {
    window.open('https://www.nlm.nih.gov/research/umls/index.html', '_blank');
  });
buttonDrug.appendChild(buttonElement);





// function buttonDrug() {
//     alert("hola");
// }