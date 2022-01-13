import BookList from '../modules/book.js';
import { DateTime } from '../node_modules/luxon/src/luxon.js';

// Render book list
const addButton = document.querySelector('#add-button');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const formMessage = document.querySelector('.form-message');
const bookList = new BookList();

const validateInputForm = () => {
  bookTitle.classList.remove('field-error');
  bookAuthor.classList.remove('field-error');
  formMessage.classList.remove('error-message');

  if (bookTitle.value === '') {
    bookTitle.classList.add('field-error');
    formMessage.textContent = 'Title field is required.';
    formMessage.classList.add('error-message');
    return false;
  }
  if (bookAuthor.value === '') {
    bookAuthor.classList.add('field-error');
    formMessage.textContent = 'Author field is required.';
    formMessage.classList.add('error-message');
    return false;
  }
  if (bookList.hasBook(bookTitle.value)) {
    formMessage.textContent = 'This book is already registered.';
    formMessage.classList.add('error-message');
    return false;
  }
  return true;
};

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (validateInputForm()) {
    bookList.addBook(bookTitle.value, bookAuthor.value);
    bookList.renderBooks();
    bookTitle.value = '';
    bookAuthor.value = '';
    formMessage.textContent = 'Book added successfully';
  }
  formMessage.classList.add('visible');
  setTimeout(() => {
    bookAuthor.classList.remove('field-error');
    bookTitle.classList.remove('field-error');
    formMessage.classList.remove('visible');
  }, 5000);
});

window.addEventListener('load', () => {
  bookList.loadLocalStorage();
  bookList.renderBooks();
});

// Add Date and Time
const dateToday = document.querySelector('.date');
const dt = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
dateToday.innerHTML = `${dt}`;

// Animate menu modal in mobile
const menuButton = document.querySelector('.navbar__menu-button');
const menuNav = document.querySelector('.navbar__menu-nav');
let menuModalOpen = false;

const menuModalClose = () => {
  menuNav.classList.toggle('navbar__menu-nav-modal');
  menuNav.removeEventListener('animationend', menuModalClose);
  menuModalOpen = false;
};

const menuToogle = () => {
  if (!menuModalOpen) {
    menuNav.style.animation = 'modalFadeIn 500ms forwards';
    menuNav.classList.toggle('navbar__menu-nav-modal');
    menuButton.classList.toggle('navbar__menu-button-modal');
    menuModalOpen = true;
  } else {
    menuNav.style.animation = 'modalFadeOut 500ms forwards';
    menuButton.classList.toggle('navbar__menu-button-modal');
    menuNav.addEventListener('animationend', menuModalClose);
  }
};
menuButton.addEventListener('click', menuToogle);

// Simple page app events
const booklist = document.querySelector('.booklist-container');
const addnew = document.querySelector('.addnew-container');
const contact = document.querySelector('.contact-container');

const listLink = document.querySelector('#list-link');
const brandLink = document.querySelector('#brand-link');
const addnewLink = document.querySelector('#addnew-link');
const contactLink = document.querySelector('#contact-link');

listLink.addEventListener('click', (e) => {
  e.preventDefault();
  booklist.classList.remove('d-none');
  addnew.classList.add('d-none');
  contact.classList.add('d-none');
  listLink.classList.add('active');
  addnewLink.classList.remove('active');
  contactLink.classList.remove('active');
  if (menuModalOpen) menuToogle();
});

addnewLink.addEventListener('click', (e) => {
  e.preventDefault();
  booklist.classList.add('d-none');
  addnew.classList.remove('d-none');
  contact.classList.add('d-none');
  listLink.classList.remove('active');
  addnewLink.classList.add('active');
  contactLink.classList.remove('active');
  if (menuModalOpen) menuToogle();
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  booklist.classList.add('d-none');
  addnew.classList.add('d-none');
  contact.classList.remove('d-none');
  listLink.classList.remove('active');
  addnewLink.classList.remove('active');
  contactLink.classList.add('active');
  if (menuModalOpen) menuToogle();
});

brandLink.addEventListener('click', (e) => {
  e.preventDefault();
  booklist.classList.remove('d-none');
  addnew.classList.add('d-none');
  contact.classList.add('d-none');
  listLink.classList.add('active');
  addnewLink.classList.remove('active');
  contactLink.classList.remove('active');
});
