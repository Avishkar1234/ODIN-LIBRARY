const bookArr = [];

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBooks(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    bookArr.push(newBook);
}

function removeBook(id) {
    const index = bookArr.findIndex(book => book.id === id);
    if (index !== -1) bookArr.splice(index, 1);
}

function toggleReadStatus(id) {
    const book = bookArr.find(book => book.id === id);
    if (book) book.isRead = !book.isRead;
}

function displayBooks() {
    const display = document.querySelector(".books");
    display.innerHTML = "";

    bookArr.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        card.innerHTML = `
            <button class="remove-btn" data-id="${book.id}">×</button>
            <h2>${book.title}</h2>
            <p><strong>Author: </strong>${book.author}</p>
            <p><strong>Pages: </strong>${book.pages}</p>
            <button class="toggle-status ${book.isRead ? 'read' : ''}" data-id="${book.id}">
                ${book.isRead ? 'Read ✅' : 'Not Read ❌'}
            </button>
        `;
        display.appendChild(card);
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => showConfirmDialog(e.target.dataset.id));
    });

    // Toggle buttons
    document.querySelectorAll('.toggle-status').forEach(btn => {
        btn.addEventListener('click', e => {
            toggleReadStatus(e.target.dataset.id);
            displayBooks();
        });
    });
}

// DOM elements
const form = document.querySelector(".book-form");
const addCard = document.querySelector(".add-btn");
const overlay = document.querySelector(".overlay");
const confirmDialog = document.querySelector('.confirm-dialog');
const confirmYes = document.querySelector('.confirm-yes');
const confirmNo = document.querySelector('.confirm-no');

let bookToDelete = null;

// Show confirm dialog
function showConfirmDialog(id) {
    bookToDelete = id;
    confirmDialog.classList.add('show');
    overlay.classList.add('show');
}

// Add button click
addCard.addEventListener("click", () => {
    form.classList.add("show");
    overlay.classList.add("show");
});

// Overlay click - close everything
overlay.addEventListener("click", () => {
    form.classList.remove("show");
    confirmDialog.classList.remove('show');
    overlay.classList.remove("show");
    bookToDelete = null;
});

// Form submission
form.addEventListener("submit", event => {
    event.preventDefault();

    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const pages = Number(form.elements.pages.value);
    const isRead = form.elements.status.checked;

    addBooks(title, author, pages, isRead);
    displayBooks();

    form.reset();
    form.classList.remove("show");
    overlay.classList.remove("show");
});

// Confirm delete
confirmYes.addEventListener('click', () => {
    if (bookToDelete) removeBook(bookToDelete);
    displayBooks();
    confirmDialog.classList.remove('show');
    overlay.classList.remove('show');
    bookToDelete = null;
});

// Cancel delete
confirmNo.addEventListener('click', () => {
    confirmDialog.classList.remove('show');
    overlay.classList.remove('show');
    bookToDelete = null;
});

// Initial books
addBooks("Harry Potter", "J.K. Rowling", 400, true);
addBooks("The Hobbit", "J.R.R. Tolkien", 310, false);

displayBooks();
