let coresBotoes = ["vermelho", "azul", "verde", "amarelo"];
let padraoJogo = [];
let padraoClicadoUsuario = [];
let level = 0;
let jogoComecou = false;

$(".btn").on("click", function(){
    let escolhaCorUsuario = $(this).attr("id");
    padraoClicadoUsuario.push(escolhaCorUsuario);
    console.log(padraoClicadoUsuario);
    tocarSom(escolhaCorUsuario);
    animarPressione(escolhaCorUsuario);
    checarResposta(padraoClicadoUsuario.length -1);
});

function proximaSequencia() {
    padraoClicadoUsuario = [];
    let numeroAleatorio = Math.floor(Math.random() * coresBotoes.length); 
    let escolhaCorAleatoria = coresBotoes[numeroAleatorio];
    padraoJogo.push(escolhaCorAleatoria);
    $("#" + escolhaCorAleatoria).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    tocarSom(escolhaCorAleatoria);
    level++;
    $("h1").text("Level" + " " + level);
    return escolhaCorAleatoria;
}

function checarResposta(levelAtual) {
    if (padraoJogo[levelAtual] === padraoClicadoUsuario[levelAtual]) {
      console.log("Sucesso");

      if (padraoClicadoUsuario.length === padraoJogo.length){
        setTimeout(function () {
          proximaSequencia();
        }, 1000);
      }

    } else {
      console.log("Errado");
      tocarSom("errado");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 100);
      $("h1").text("Game Over!, Pressione Qualquer Tecla Para Reiniciar");
      acabou();
    }
}

function tocarSom(nome){
    const audio = new Audio("/Simon Game Challenge Starting Files/sounds/" + nome + ".mp3");
    audio.play();
}

function animarPressione(corAtual){
    $("#" + corAtual).addClass("pressed");
    setTimeout(function () {
    $("#" + corAtual).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
  if (!jogoComecou) {
    proximaSequencia();
    jogoComecou = true;
  }
});


function acabou(){
    level = 0;
    padraoJogo = [];
    jogoComecou = false;
}

    




