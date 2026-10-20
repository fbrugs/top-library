const lib = [];

const addButton = document.querySelector(".add-book-btn");

const bookFormContainer = document.querySelector(".book-form-container");
const bookForm = document.querySelector("#form")
const submitBook = document.querySelector(".submit-btn");
const inputs = document.querySelectorAll(".input-text");

function addCard(obj) {
	const main = document.querySelector('main');
	const div = document.createElement('div');

	for (item in obj) {

		const header = document.createElement("p");
		const value = document.createElement("h1");

		header.innerText = item;
		value.innerText = obj[item];
		div.appendChild(header)
		div.appendChild(value)

		console.log(item + ':' + obj[item])
	}

	div.classList.add('card');
	main.appendChild(div)
}

function Book(title, author, pages, read, id) {
	this.title = title,
	this.author = author,
	this.pages = pages,
	this.read = read,
	this.id = id
}

// bookFormContainer.style.visibility = "hidden"

addButton.addEventListener("click", (e) => {
	if (bookFormContainer.style.visibility === "hidden") {
		bookFormContainer.style.visibility = "visible";
	} else {
		bookFormContainer.style.visibility = "hidden";
	}
})

bookForm.addEventListener("submit", (e) => {
	e.preventDefault()
	bookFormContainer.style.visibility = "hidden";
	
	const formData = new FormData(bookForm);
	const title = formData.get('title').toLowerCase();
	const author = formData.get('author').toLowerCase();
	const pages = formData.get('pages').toLowerCase();
	const read = formData.get('read') ? true : false;
	const id = crypto.randomUUID();

	const book = new Book(title, author, pages, read, id);
	lib.push(book);
	addCard(book)
	bookForm.reset()
})

const book1 = new Book('Jan gaat eten', 'Fabian Brugs', 96, false, crypto.randomUUID());
const book2 = new Book('Ik hou van jou', 'Gioya Diels', 216, true, crypto.randomUUID());
lib.push(book1);
lib.push(book2);


addCard(lib[1]);
// addCard(lib[1]);
// addCard(lib[1]);
// addCard(lib[1]);
// addCard(lib[1]);
// addCard(lib[1]);
// addCard(lib[0]);
// addCard(lib[0]);
// addCard(lib[0]);
