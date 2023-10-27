// https://stackoverflow.com/a/9772864/12461573 <-- MUST READ
const loginForm = document.getElementById("addForm")
const bookTable = document.getElementById("bookTable")

const myLibrary = []
let index = 1;

function Book(name, author, pages, read, index) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
}

function addBookToLibrary() {
  let bookName = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let hasBeenRead = document.getElementById("hasBeenRead").checked;
  if (bookName && author && pages) {
    const newBook = new Book(bookName, author, pages, hasBeenRead, index);
    myLibrary.push(newBook);
    ++index;
  }
}

// TODO: push the books with ID's into the table
// so we can delete them with their id
function deleteRow(rowId) {
  myLibrary.pop(rowId - 1);
  const row = document.getElementById(rowId);
  row.parentNode.removeChild(row);

  --index;
}

function listBooksInTable() {
  var row = bookTable.insertRow(-1);
  row.setAttribute('id', `row${myLibrary.at(-1).index}`);

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('id', `row${myLibrary.at(-1).index}`);
  deleteButton.setAttribute('onclick', `deleteRow("row${myLibrary.at(-1).index}")`)
  deleteButton.innerHTML = "Delete";

  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);

  row.appendChild(deleteButton);
  cell0.innerHTML = myLibrary.at(-1).index;
  cell1.innerHTML = myLibrary.at(-1).name;
  cell2.innerHTML = myLibrary.at(-1).author;
  cell3.innerHTML = myLibrary.at(-1).pages;
  cell4.innerHTML = myLibrary.at(-1).read;
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const book = addBookToLibrary();
  listBooksInTable(book);
})