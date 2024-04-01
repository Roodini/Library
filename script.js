const container = document.querySelector(".container");
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const dialog2 = document.getElementById("dialog2")
const form = document.getElementById("form");
const editForm = document.getElementById("form2");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const editTitle = document.getElementById("edit-title");
const editAuthor = document.getElementById("edit-author");
const editPages = document.getElementById("edit-pages");
const exitBtn = document.getElementById("exit-btn");
const exitBtn2 = document.getElementById("exit-btn2");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBook() {
  const book1 = new Book(
    "The Subtle Art of Not Giving a Fuck",
    "Mark Manson",
    206,
    "NO"
  );
  const book2 = new Book("The Confidence Gap", 
  "Russel Harris", 
  250, 
  "YES"
  );

  addBookToLibrary(book1);
  addBookToLibrary(book2);
  renderBooks();

  form.addEventListener("submit", (event) => {
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let read = "NO";
    let newBook = new Book(title, author, pages, read);

    if (!newBook.title || !newBook.author || !newBook.pages) {
      alert("Incomplete form");
      event.preventDefault();
    } else {
      addBookToLibrary(newBook);
      dialog.close();
      form.reset();
      renderBooks();
      event.preventDefault();
    }
  });
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

    const readStatus = document.createElement("input");
    readStatus.setAttribute("type", "checkbox");
    readStatus.id = `readStatus${index}`;
    readStatus.checked = book.read === "YES";

    const label = document.createElement("label");
    label.textContent = `Read: ${book.read}`;
    label.htmlFor = `readStatus`;

    readStatus.addEventListener("change", () => {
      book.read = readStatus.checked ? "YES" : "NO";
      label.textContent = `Read: ${book.read}`;
    });
    newDiv.appendChild(readStatus);
    newDiv.appendChild(label);
   
   
    const deleteCard = document.createElement("button");
    deleteCard.classList.add("delete-button");
    deleteCard.textContent = "Delete Book Card";
    newDiv.appendChild(deleteCard);
    

    deleteCard.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      renderBooks();
    });

    const editCard = document.createElement("button");
    editCard.textContent = "Edit Book Card";
    newDiv.appendChild(editCard);


    editCard.addEventListener("click", () => {
      dialog2.showModal();
      editTitle.value = book.title;
      editAuthor.value = book.author;
      editPages.value = book.pages;
      
      exitBtn2.addEventListener("click", (event) => {
        dialog2.close();
        event.preventDefault();
      });
      
      editForm.addEventListener("submit", (event) => {
      book.title = editTitle.value;
      book.author = editAuthor.value;
      book.pages = editPages.value;
      event.preventDefault();
      dialog2.close();
      renderBooks();
  });
})
     
    })
};


function addBookToLibrary(book) {
  myLibrary.push(book);
}

createBook();
