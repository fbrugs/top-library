const lib = [];

const addButton = document.querySelector(".add-book-btn");
const bookFormContainer = document.querySelector(".book-form-container")

addButton.addEventListener("click", (e) => {
	if (bookFormContainer.style.visibility === "hidden") {
		bookFormContainer.style.visibility = "visible";
	} else {
		bookFormContainer.style.visibility = "hidden";
	}
})


