export default class BookList {
  constructor() {
    this.books = [];
  }

  saveLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(this.books));
  };

  loadLocalStorage = () => {
    const localBooks = JSON.parse(localStorage.getItem('books'));
    if (localBooks) { this.books = localBooks; }
  };

  addBook = (bookTitle1, bookAuthor1) => {
    const id = this.books.length === 0 ? 1 : this.books[this.books.length - 1].id + 1;
    this.books.push({ id, title: bookTitle1, author: bookAuthor1 });
    this.saveLocalStorage();
  };

  removeBook = (book) => {
    this.books = this.books.filter((b) => b.id !== book.id);
    this.saveLocalStorage();
  };

  hasBook = (bookTitle1) => {
    if (this.books.find((b) => b.title === bookTitle1)) return true;
    return false;
  };

  renderBooks = () => {
    const booksList = document.querySelector('.books-list');
    booksList.innerText = '';
    this.books.forEach((book) => {
      const div = document.createElement('div');
      div.classList.add('card-container');
      const divCard = document.createElement('div');
      divCard.classList.add('card');
      const divCardBody = document.createElement('div');
      divCardBody.classList.add('card-body');
      const h3 = document.createElement('h3');
      h3.classList.add('card-title');
      h3.innerText = `${book.title}`;
      const h4 = document.createElement('h4');
      h4.classList.add('card-subtitle');
      h4.innerText = `${book.author}`;
      const anchor = document.createElement('a');
      anchor.classList.add('btn', 'btn-danger');
      anchor.innerText = 'Remove';
      anchor.addEventListener('click', () => {
        this.removeBook(book);
        this.renderBooks();
      });
      divCardBody.appendChild(h3);
      divCardBody.appendChild(h4);
      divCardBody.appendChild(anchor);
      divCard.appendChild(divCardBody);
      div.appendChild(divCard);
      booksList.appendChild(div);
    });
  };
}
