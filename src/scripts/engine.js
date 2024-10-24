const state = {
    view: {
        squares: document.querySelectorAll(".square"), //Quadrado da janela que vai mostrar o inimo
        enemy: document.querySelector(".enemy"), //Classe da janela com inimigo
        timeLeft: document.querySelector("#time-left"), //Tempo de duração da partida
        score: document.querySelector("#score"), //Pontuação na partida
        lives: document.querySelector("#lives"),
      },
    values:{
        gameVelocity: 1000, //Tempo de troca do inimigo nas janelas
        hitPosition: 0, //Ponto de colisão - quadrado que foi clicado o quadrado com id igual ao hitPosition (com classe enemy)
        result: 0, //Pontuação
        lives: 4,
        currentTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000), //Armazena o tempo de troca do inimigo nas janelas
        countDownTimerId: setInterval(countDown, 1000), //Registra o tempo de decréscimo do contador
    },
};

function countDown(){
    state.values.currentTime--; //Decrementar o tempo
    state.view.timeLeft.textContent = state.values.currentTime;

    // Verificar se o tempo acabou
    if (state.values.currentTime <=0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert(`Game over! O seu resultado foi: ${state.values.result}`);
    };
};

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
};

// Sorteio do quadrado onde o Ralph será mostrado
function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy"); //Remove a classe enemy de qualquer quadrado
    });

    // Sortear um númeiro inteiro de 1 a 9
    let randomNumber = Math.floor(Math.random() * 9);
    // Selecionar o quadrado sorteado
    let randomSquare = state.view.squares[randomNumber];
    // Acrescentar a classe enemy ao quadrado sorteado
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

// Criar o clique na caixa para derrotar o inimigo
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++; //Soma um cada vez que clicar no quadrado com classe enemy
                state.view.score.textContent = state.values.result; //Mostra o resultado até o momento
                state.values.hitPosition = null; //Limpa o clique, para permitir somente um clique por vez
                playSound("hit");
            }
        });
    });
};

// Função de inicialização
function initialize(){
    // Captura os cliques nas janelas
    addListenerHitBox();
}

initialize();