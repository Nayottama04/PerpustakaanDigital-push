import { LibraryController } from "./controllers/LibraryController.js";
import { BookForm } from "./views/BookForm.js";
import { BookList } from "./views/BookList.js";

const bookForm = new BookForm();
const bookList = new BookList();
const libraryController = new LibraryController(bookForm, bookList);

bookForm.render(libraryController.addBook.bind(libraryController));
bookList.render(
  libraryController.books,
  libraryController.deleteBook.bind(libraryController),
  libraryController.editBook.bind(libraryController)
);

// Fungsi untuk menangani filter tahun
window.applyYearFilter = function () {
    const year = document.getElementById("filter-year").value;
    if (year) {
      libraryController.filterByYear(year);
    } else {
      libraryController.saveAndRender();
    }
  };
  
document
.getElementById("theme-toggle")
.addEventListener(
  "click",
  libraryController.toggleTheme.bind(libraryController)
);
libraryController.initTheme();