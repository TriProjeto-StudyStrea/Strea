const modal = document.getElementById('modal');
const btnAdicionar = document.getElementById('btnAdicionar');
const btnSalvar = document.getElementById('btnSalvar');
const Titulo = document.getElementById('m-titulo');
const Conteudos = document.getElementById('m-conteudos');
const tableBody = document.getElementById('tableBody');

let itens = [];

btnAdicionar.onclick = () => {
  modal.style.display = 'block';
  Titulo.value = '';
  Conteudos.value = '';
};

btnSalvar.onclick = () => {
  const novoTitulo = Titulo.value;
  const novoConteudo = Conteudos.value;

  if (novoTitulo === '' || novoConteudo === '') {
    alert('Preencha todos os campos!');
    return;
  }

  const novoItem = { titulo: novoTitulo, conteudo: novoConteudo };
  itens.push(novoItem);
  localStorage.setItem('itens', JSON.stringify(itens));

  modal.style.display = 'none';
  loadItens();
};

function loadItens() {
  itens = JSON.parse(localStorage.getItem('itens')) || [];
  tableBody.innerHTML = '';

  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

function insertItem(item, index) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.titulo}</td>
    <td>${item.conteudo}</td>
    <td class="acao">
      <button onclick="editItem(${index})">Editar</button>
      <button onclick="deleteItem(${index})">Excluir</button>
    </td>
  `;

  tableBody.appendChild(tr);
}

function editItem(index) {
  const item = itens[index];
  Titulo.value = item.titulo;
  Conteudos.value = item.conteudo;

  const confirmarEdicao = confirm('Deseja salvar as alterações?');
  if (confirmarEdicao) {
    itens[index].titulo = Titulo.value;
    itens[index].conteudo = Conteudos.value;
    localStorage.setItem('itens', JSON.stringify(itens));
    loadItens();
  }
}

function deleteItem(index) {
  const confirmarExclusao = confirm('Deseja excluir este item?');
  if (confirmarExclusao) {
    itens.splice(index, 1);
    localStorage.setItem('itens', JSON.stringify(itens));
    loadItens();
  }
}

loadItens();

