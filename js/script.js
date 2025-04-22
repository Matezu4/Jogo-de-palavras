const wordText = document.querySelector(".word"),
      hintText = document.querySelector(".hint span"),
      classeText = document.querySelector(".classe span"),
      timeText = document.querySelector(".time b"),
      inputField = document.querySelector("input"),
      refreshBtn = document.querySelector(".refresh-word"),
      checkBtn = document.querySelector(".check-word"),
      modal = document.getElementById("modal"),
      modalTitle = document.getElementById("modalTitle"),
      modalMessage = document.getElementById("modalMessage"),
      modalBtn = document.getElementById("modalBtn"),
      modalContent = document.querySelector(".modal-content");

let correctWord, timer;

// Função para mostrar o modal
function showModal(title, message, type) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    modalContent.classList.remove("error", "success", "warning");
    modalContent.classList.add(type);
    
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

modalBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

const iniciarTemporizador = tempoMax => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(tempoMax > 0) {
            tempoMax--;
            return timeText.innerText = tempoMax;
        }
        showModal("Tempo esgotado!", `A palavra correta era ${correctWord.toUpperCase()}`, "error");
        iniciarJogo();
    }, 1000);
};

const iniciarJogo = () => {
    iniciarTemporizador(30);
    let objetoAleatorio = words[Math.floor(Math.random() * words.length)];
    let letrasEmbaralhadas = objetoAleatorio.word.split("");

    for (let i = letrasEmbaralhadas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [letrasEmbaralhadas[i], letrasEmbaralhadas[j]] = [letrasEmbaralhadas[j], letrasEmbaralhadas[i]];
    }

    wordText.innerText = letrasEmbaralhadas.join("");
    hintText.innerText = objetoAleatorio.hint;
    classeText.innerText = objetoAleatorio.classe;
    correctWord = objetoAleatorio.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};
iniciarJogo();

const verificarPalavra = () => {
    let palavraDigitada = inputField.value.toLowerCase();
    if(!palavraDigitada) {
        showModal("Atenção!", "Digite uma palavra para verificar!", "warning");
        return;
    }
    if(palavraDigitada !== correctWord) {
        showModal("Ops!", `"${palavraDigitada}" não está correta. Tente novamente!`, "error");
        return;
    }
    
    showModal("Parabéns!", `"${correctWord.toUpperCase()}" está correta!`, "success");
    setTimeout(iniciarJogo, 1500);
};

refreshBtn.addEventListener("click", iniciarJogo);
checkBtn.addEventListener("click", verificarPalavra);

inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        verificarPalavra();
    }
});

