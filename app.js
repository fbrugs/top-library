class Book {

	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.id = crypto.randomUUID();
	}

	toggleRead() {
		this.read = !this.read;
	}

}

const libraryController = () => {

	const saveLibrary = () => {
		localStorage.setItem("library", JSON.stringify(lib));
	}

	const lib = JSON.parse(localStorage.getItem("library")) || [];

	const removeBook = (id) => {
		const index = lib.findIndex(item => item.id === id);

		if (index === -1) {
			throw new Error("Cannot remove item, index not found");
		}

		lib.splice(index, 1);
		saveLibrary();
	}

	const addBook = (title, author, pages, read) => {
		lib.push(new Book(title, author, pages, read));
		saveLibrary();
	}

	const getBook = (id) => {
		const index = lib.findIndex(item => item.id === id)
		return lib[index]
	}

	const getLibrary = () => lib


	return {
		removeBook,
		addBook,
		getLibrary,
		getBook
	}

}

const displayController = (() => {

	const lib = libraryController();

	function render() {
		const main = document.querySelector("main");
		const library = lib.getLibrary();
		main.innerHTML = "";

		for (const obj of library) {

			const cardDiv = document.createElement("div");
			const removeButton = document.createElement("button");

			for (const [key, value] of Object.entries(obj)) {

				if (key !== 'id') {
					const header = document.createElement("h1");
					const title = document.createElement("p");
					header.innerText = key;
					title.innerText = value;

					cardDiv.appendChild(header);
					cardDiv.appendChild(title);
				}
			}

			cardDiv.classList.add("card");
			cardDiv.setAttribute('data-id', obj.id);

			removeButton.addEventListener("click", () => {
				lib.removeBook(obj.id);
				cardDiv.remove();
			});

			removeButton.classList.add("del-btn");
			removeButton.innerText = "\u2717";

			cardDiv.appendChild(removeButton);
			main.appendChild(cardDiv);
		}
	}

	const bookFormContainer = document.querySelector(".book-form-container");
	const addButton = document.querySelector(".add-book-btn");

	addButton.addEventListener("click", (e) => {
		bookFormContainer.style.visibility = bookFormContainer.style.visibility === "hidden" ? "visible" : "hidden"
	})

	const bookForm = document.querySelector("#form");

	bookForm.addEventListener("submit", (e) => {
		e.preventDefault();
		bookFormContainer.style.visibility = "hidden";

		const formData = new FormData(bookForm);
		const title = formData.get('title').toLowerCase();
		const author = formData.get('author').toLowerCase();
		const pages = Number(formData.get('pages'));
		const read = formData.get('read') ? true : false;

		lib.addBook(title, author, pages, read);
		bookForm.reset();
		render();
	});

	render();

})();


// UNFINISHED: ADD TOGGLE SWITCH READ STATUS! WITHIN RENDER()