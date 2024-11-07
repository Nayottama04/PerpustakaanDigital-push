export class BookList {
    constructor() {
        this.booklistContainer = document.getElementById("book-list");
    }

    render(books, onDelete, onEdit) {
        if (books.length === 0) {
            this.booklistContainer.innerHTML = `<p class="text-center">Belum ada buku yang ditambahkan.</p>`;
            return;
        }
        this.booklistContainer.innerHTML = `
            <h2 class="h4 mb-3">Daftar Buku</h2>
            <div class="mb-3">
                <label for="year-filter" class="form-label">Filter berdasarkan Tahun</label>
                <select id="year-filter" class="form-select">
                    <option value="">Semua Tahun</option>
                    ${[...new Set(books.map((book) => book.year))]
                        .sort((a, b) => a - b)
                        .map((year) => `<option value="${year}">${year}</option>`)
                        .join("")}
                </select>
            </div>
            <div class="row" id="filtered-book-list">
                ${this.renderBookCards(books)}
            </div>
        `;

        // Event listener for filter selection
        document.getElementById("year-filter").addEventListener("change", (e) => {
            const selectedYear = e.target.value;
            this.applyYearFilter(books, selectedYear, onDelete, onEdit);
        });

        // Set event listeners for edit and delete buttons
        this.setEventListeners(onDelete, onEdit);
    }

    renderBookCards(books) {
        return books
            .map(
                (book) => `
                    <div class="col-md-6 mb-3">
                        <div class="card shadow-neumorphic book-card glassy">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text mb-1"><strong>Penulis:</strong> ${book.author}</p>
                                <p class="card-text"><strong>Tahun:</strong> ${book.year}</p>
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-warning btn-sm me-2 edit-btn shadow-neumorphic" data-id="${book.id}">
                                        <i class="bi bi-pencil-fill"></i> Edit
                                    </button>
                                    <button class="btn btn-danger btn-sm delete-btn shadow-neumorphic" data-id="${book.id}">
                                        <i class="bi bi-trash-fill"></i> Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            )
            .join("");
    }

    applyYearFilter(books, selectedYear, onDelete, onEdit) {
        const filteredBooks = selectedYear
            ? books.filter((book) => book.year === selectedYear)
            : books;
        
        document.getElementById("filtered-book-list").innerHTML = this.renderBookCards(filteredBooks);

        // Update event listeners for filtered results
        this.setEventListeners(onDelete, onEdit);
    }

    setEventListeners(onDelete, onEdit) {
        this.booklistContainer.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", () => onDelete(button.dataset.id));
        });

        this.booklistContainer.querySelectorAll(".edit-btn").forEach((button) => {
            button.addEventListener("click", () => onEdit(button.dataset.id));
        });
    }
}
