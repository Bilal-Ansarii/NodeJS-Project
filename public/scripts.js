document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const bookForm = document.getElementById("book-form");
  const updateForm = document.getElementById("update-form");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumber = document.getElementById("page-number");
  const searchBar = document.getElementById("search-bar");
  const searchButton = document.getElementById("search-button");
  let currentPage = 0;
  let searchQuery = "";

  function fetchBooks(page = 0, query = "") {
    const url = query
      ? `/books/search?q=${query}&p=${page}`
      : `/books?p=${page}`;
    fetch(url)
      .then((response) => response.json())
      .then((books) => {
        bookList.innerHTML = "";
        books.forEach((book) => {
          const bookItem = document.createElement("a");
          bookItem.className = "list-group-item list-group-item-action";
          bookItem.innerHTML = `
                        <div class="d-flex w-100 justify-content-between">
  <h6 class="mb-1"><span>Title: </span>${book.title}</h6>
  <div class="d-flex gap-2">  <button class="btn btn-sm btn-primary" onclick="editBook('${book._id}', '${book.title}', '${book.author}', '${book.genre}', ${book.year})">Edit</button>
    <button class="btn btn-sm btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
  </div>
</div>
                        <p class="mb-1"><span>Authur: </span>${book.author} - <span>Book Id: </span>${book._id}</p>
                        <small><span>Genre: </span>${book.genre} - <span>Year: </span>${book.year}</small>
                    `;
          bookList.appendChild(bookItem);
        });
        updatePaginationControls(books.length);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }

  // Update pagination controls
  function updatePaginationControls(bookCount) {
    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.disabled = bookCount < 4; // 4 is booksPerPage in the backend
    pageNumber.textContent = currentPage + 1;
  }

  // Add a new book
  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newBook = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      genre: document.getElementById("genre").value,
      year: parseInt(document.getElementById("year").value),
    };

    fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Book added:", result);
        fetchBooks(currentPage, searchQuery);
        bookForm.reset();
      })
      .catch((error) => console.error("Error adding book:", error));
  });

  // Update a book
  updateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const bookId = document.getElementById("update-object-id").value;
    const updatedBook = {};

    const title = document.getElementById("update-title").value;
    const author = document.getElementById("update-author").value;
    const genre = document.getElementById("update-genre").value;
    const year = document.getElementById("update-year").value;

    if (title) updatedBook.title = title;
    if (author) updatedBook.author = author;
    if (genre) updatedBook.genre = genre;
    if (year) updatedBook.year = parseInt(year);

    fetch(`/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Book updated:", result);
        fetchBooks(currentPage, searchQuery);
        updateForm.reset();
      })
      .catch((error) => console.error("Error updating book:", error));
  });

  // Delete a book
  window.deleteBook = function (id) {
    fetch(`/books/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Book deleted:", result);
        fetchBooks(currentPage, searchQuery);
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  // Edit a book
  window.editBook = function (id, title, author, genre, year) {
    document.getElementById("update-object-id").value = id;
    document.getElementById("update-title").value = title;
    document.getElementById("update-author").value = author;
    document.getElementById("update-genre").value = genre;
    document.getElementById("update-year").value = year;
  };

  // Search books
  searchButton.addEventListener("click", () => {
    searchQuery = searchBar.value;
    currentPage = 0;
    fetchBooks(currentPage, searchQuery);
  });

  // Pagination controls
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      fetchBooks(currentPage, searchQuery);
    }
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage++;
    fetchBooks(currentPage, searchQuery);
  });

  // Initial fetch of books
  fetchBooks();
});
