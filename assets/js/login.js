document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("loginModal");
    var loginLinks = document.querySelectorAll("a[href='#login']");
    var span = document.getElementsByClassName("close")[0];

    // Adiciona o evento de clique a todos os links de login
    loginLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            modal.style.display = "block";
        });
    });

    // Fecha o modal ao clicar no botão de fechar (×)
    span.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});