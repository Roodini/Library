const container = document.querySelector(".container");
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const form = document.getElementById("form");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const exitBtn = document.getElementById("exit-btn");

let myLibrary = [];

function Book() {
  this.title = "";
  this.author = "";
  this.pages = "";

  this.createBook = function () {
    form.addEventListener("submit", (event) => {
      let newBook = new Book();

      newBook.title = bookTitle.value;
      newBook.author = bookAuthor.value;
      newBook.pages = bookPages.value;
      if (!newBook.title || !newBook.author || !newBook.pages) {
        alert("Incomplete form");
        event.preventDefault();
      } else {
        myLibrary.push(newBook);
        dialog.close();
        form.reset();
        renderBooks();
        event.preventDefault();
      }
    });
  };
}

exitBtn.addEventListener("click", (event) => {
  dialog.close();
  event.preventDefault();
});

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

function renderBooks() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  myLibrary.forEach((book, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-card");
    newDiv.setAttribute("data-index", index);

    const titleP = document.createElement("p");
    titleP.textContent = `Title: ${book.title}`;
    newDiv.appendChild(titleP);

    const authorP = document.createElement("p");
    authorP.textContent = `Author: ${book.author}`;
    newDiv.appendChild(authorP);

    const pagesP = document.createElement("p");
    pagesP.textContent = `Pages: ${book.pages}`;
    newDiv.appendChild(pagesP);

    container.appendChild(newDiv);
  });
}
function addBookToLibrary() {
  let book = new Book();
  book.createBook();
}
addBookToLibrary();
