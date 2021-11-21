const nomeBusca = document.querySelector(".input");
const mensagemErro = document.querySelector("#mensagemErro");
const botaoBuscar = document.querySelector("#botao_buscar");
const titulo = document.querySelector("#titulo");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const diretor = document.querySelector("#diretor");
const atores = document.querySelector("#atores");
const poster = document.querySelector(".poster");
const sinopse = document.querySelector("#sinopse");
const apiKey = "7c236626";
const imgDefault = "./default_image.png";

async function buscaFilme(nomeBusca) {
    const resposta = await fetch(`http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`);
    return resposta.json();
}

botaoBuscar.addEventListener("click", () => {
    limparCampos();
    core();
})
async function core() {
    try {
        const filme = await buscaFilme(nomeBusca.value);
        validaDados(filme);
        defineValor(filme);
    } catch (erro) {
        console.log(erro);
        mensagemErro.textContent = `${erro}`;
    }

}

function defineValor(filme) {
    titulo.textContent = filme.Title;
    sinopse.textContent = filme.Plot;
    ano.texContent = `Year: ${filme.Year}`;
    duracao.texContent = `Run time: ${filme.Runtime}`;
    genero.texContent = `Genre: ${filme.Genre}`;
    atores.texContent = `Actors: ${filme.Actors}`;
    diretor.texContent = `Director: ${filme.Director}`;
    poster.setAttribute("src", filme.Poster);

}

function limparCampos() {
    titulo.textContent = "";
    sinopse.textContent = "";
    ano.texContent = "";
    duracao.texContent = "";
    genero.texContent = "";
    atores.texContent = "";
    diretor.texContent = "";
    poster.texContent = ("src", imgDefault);
}

function validaDados(filme) {
    if (filme.Plot === undefined || filme.Year === undefined || filme.Actors === "N/A") {
        throw new Error("Filme não encontrado!!!");
    }
}