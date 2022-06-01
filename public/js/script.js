const closeMenssagem = document.querySelector("#close");
const menssagem = document.querySelector("#menssagem");

closeMenssagem.addEventListener("click", function () {
    menssagem.style.display = "none";
})

setTimeout(() => {
    menssagem.style.display = "none";
}, 3000)