const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const Titulo = document.querySelector('#m-titulo');
const Conteudos = document.querySelector('#m-conteudos');

let itens = [];
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.classList.contains('modal-container')) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    Titulo.value = itens[index].titulo;
    Conteudos.value = itens[index].conteudos;
    id = index;
  } else {
    Titulo.value = '';
    Conteudos.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.titulo}</td>
    <td>${item.conteudos}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

  tbody.appendChild(tr);
}

btnSalvar.onclick = e => {
  e.preventDefault();

  if (Titulo.value === '' || Conteudos.value === '') {
    return;
  }

  if (id !== undefined) {
    itens[id].titulo = Titulo.value;
    itens[id].conteudos = Conteudos.value;
  } else {
    itens.push({ titulo: Titulo.value, conteudos: Conteudos.value });
  }

  setItensBD();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) || [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();
