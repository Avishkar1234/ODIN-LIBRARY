const bookArr = []

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBooks(title, author, pages, isRead){
    const newBook = new Book(title, author, pages, isRead)
    bookArr.push(newBook)
}

function displayBooks() {
    const display = document.querySelector(".books")
    display.innerHTML = ""

    for(let book of bookArr) {
        const card = document.createElement("div");
        card.classList.add("book-card")
        card.dataset.id = book.id;

        card.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author: </strong>${book.author}</p>
            <p><strong>Pages: </strong>${book.pages}</p>
            <p><strong>Status:</strong> ${book.isRead ? 'Read ✅' : 'Not Read ❌'}</p>
        `;
        display.appendChild(card)
    }
}

addBooks("Harry Potter", "J.K. Rowling", 400, true);
addBooks("The Hobbit", "J.R.R. Tolkien", 310, false);

displayBooks();