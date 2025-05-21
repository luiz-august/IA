function Abrir() {
    var form = document.getElementById("suporte-form");
    form.style.display = (form.style.display === "flex") ? "none" : "flex";
}
function fechar(){
   let form = document.getElementById("suporte-form");
   form.style.display = "none";
}
