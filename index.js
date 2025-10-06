const bookArr = []

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}