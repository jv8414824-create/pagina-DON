// 1. SELECIONAR os elementos do DOM
const campo = document.getElementById("tarefa");
const botao = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// 2. FUNÇÃO que cria uma nova tarefa
function adicionarTarefa() {
    const texto = campo.value.trim();

    // Validação: não deixa adicionar tarefa vazia 
    if (texto === "") {
        mensagem.textContent = "Escreva algo antes de adicionar.";
        campo.focus();
        return;
    } 
    mensagem.textContent = "";

    // CRIAR elementos novos 
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.className = "remover";
    botaoRemover.type = "button";

    // Montar a estrutura: <li><span>texto</span><button>Remover</button></li>
    li.appendChild(span);
    li.appendChild(botaoRemover);
    lista.appendChild(li);

    // LIMPAR o campo e voltar o foco para ele 
    campo.value = "";
    campo.focus();

    atualizarContador();
}

// 3. FUNÇÃO que atualiza o texto do contador
function atualizarContador() {
    const total = lista.querySelectorAll("li").length;
    const feitas = lista.querySelectorAll("li.concluida").length;

    if (total === 0) {
        contador.textContent = "Nenhuma tarefa ainda.";
    } else {
        contador.textContent = `${feitas} de ${total} concluída(s).`;
    }
}

// 4. EVENTOS 

// Clique no botão "adicionar"
botao.addEventListener("click", adicionarTarefa);

// Apertar Enter no campo também adiciona
campo.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

// Delegação de eventos: um único "ouvinte" na lista
lista.addEventListener("click", (evento) => {
    const alvo = evento.target;
    const li = alvo.closest("li");
    if (!li) return;

    if (alvo.classList.contains("remover")) {
        li.remove(); // REMOVER do DOM
    } else if (alvo.tagName === "SPAN") {
        li.classList.toggle("concluida"); // ALTERAR classe CSS
    }

    atualizarContador();

});

//TEM CLARO / ESCURO
const botaotema = document.getElementById("tema");
const raiz = document.documentElement; // a teg <html>

function aplicartema(tema){
    raiz.setAttribute("data-tema", tema);
    botaotema.textContent = tema === "escuro" ? "tema claro" : "tema escuro";
}

// AO abrir a página: usa o tema salvo ou, se não houver, o do sistema
const temaSalvo = localStorage.getItem("tema");
const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
aplicartema(temaSalvo || (sistemaEscuro ? "escuro" : "claro"));

// AO clicar: inverte o tema e salva a escolha 
botaotema.addEventListener("click", () => {
    const atual = raiz.getAttribute("date-tema");
    const nivo = atual === "escuro" ? "claro" : "escuro";
    aplicartema(novo);
localStorage.setItem("tema", novo);

});