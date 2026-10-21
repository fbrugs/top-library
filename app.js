const lib = [];

const addButton = document.querySelector(".add-book-btn");

const bookFormContainer = document.querySelector(".book-form-container");
const bookForm = document.querySelector("#form")
const submitBook = document.querySelector(".submit-btn");

function addCard(obj, id) {
	const main = document.querySelector("main");
	const div = document.createElement("div");
	const secDiv = document.createElement("div");
	const button = document.createElement("button");

	button.setAttribute("data-id", id);
	button.setAttribute("onClick", `deleteMe("${id}")`);
	button.classList.add("del-btn");
	button.innerText = "\u2717";

	for (item in obj) {
		const header = document.createElement("p");
		const value = document.createElement("h1");

		if (item !== "id") {
			header.innerText = item + ':';
			value.innerText = obj[item];
			div.appendChild(header);
			div.appendChild(value);
		}

		if (item === 'id') {
			div.setAttribute("data-id", id);
		}
	}

	div.appendChild(secDiv);
	div.appendChild(button)
	div.classList.add('card');

	main.appendChild(div)
}

function Book(title, author, pages, read, id) {
	this.title = title,
	this.author = author,
	this.pages = pages,
	this.read = read,
	this.id = id;
}

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
	addCard(book, id)
	bookForm.reset()
})

function deleteMe(id) {
	const thisItem = document.querySelector(`[data-id="${id}"]`);
	thisItem.remove();
}

