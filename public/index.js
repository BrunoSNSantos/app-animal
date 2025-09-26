async function carregar_animais() {
  const response = await axios.get("http://localhost:8000/animais"); //criando uma requisição que tem como resposta uma lista(response)

  const animais = response.data; //criando uma variavel que recebe a lista(response)

  const lista = document.getElementById("lista-animais"); //pegando cada elemento da lista animais

  lista.innerHTML = ""; //limpando a lista

  animais.forEach((animal) => {
    const item = document.createElement("li");
    item.innerText = animal.nome;

    lista.appendChild(item);
  });
}

function manipular_formulario() {
  const form_animal = document.getElementById("form-animal");
  const input_nome = document.getElementById("nome");

  form_animal.onsubmit = async (event) => {
    event.preventDefault();
    const nome_animal = input_nome.value;
    alert(`${nome_animal} adicionado com sucesso!!!`);

    await axios.post("http://localhost:8000/animais", {
      nome: nome_animal,
      idade: 4,
      sexo: "Macho",
      cor: "Branco",
    });
    carregar_animais();
  };
}

function app() {
  console.log("Hello World!!!");
  carregar_animais();
  manipular_formulario();
}

app();
