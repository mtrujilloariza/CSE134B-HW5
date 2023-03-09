import { loadPosts } from "./postLoader.js";

window.addEventListener("load", init());

function init() {
	let addPostBtn = document.querySelector("#addPost");

	// load posts from local storage
	let posts = JSON.parse(localStorage.getItem("posts")) || [];
	// if its empty, add some dummy posts
	if (posts.length == []) {
		posts.unshift({
			title: "Welcome to my blog!",
			date: "2022-02-01",
			content: "This is my first post. I hope you enjoy it!",
		});

		posts.unshift({
			title: "Post 2",
			date: "2022-02-02",
			content: "This is my second post. I hope you enjoy it!",
		});

		posts.unshift({
			title: "Post 3",
			date: "2020-02-03",
			content: "This is my third post. I hope you enjoy it!",
		});

		localStorage.setItem("posts", JSON.stringify(posts));
	}

	// display posts
	loadPosts(posts);

	// when the add post button is clicked, show the dialog with the post form
	addPostBtn.addEventListener("click", function () {
		let dialog = document.querySelector("#postDialog");
		dialog.showModal();
	});

	// get the cancel button on the post form
	let cancelPostBtn = document.querySelector("#cancelPost");
	// when clicked cancel, close the dialog
	cancelPostBtn.addEventListener("click", function () {
		let dialog = document.querySelector("#postDialog");
		dialog.close();
	});
	// get the form on the create post dialog
	let postForm = document.querySelector("#postForm");
	// when the form is submitted, create a post from the inputs and save it to local storage, then close the dialog
	postForm.addEventListener("submit", function (e) {
		e.preventDefault();
		// get the values from the form
		let postFormTitle = document.querySelector("#postFormTitle");
		let postFormDate = document.querySelector("#postFormDate");
		let postFormContent = document.querySelector("#postFormContent");
		// create a post object
		let post = {
			title: postFormTitle.value,
			date: postFormDate.value,
			content: postFormContent.value,
		};
		// reset the form
		this.reset();
		// close the dialog
		let dialog = document.querySelector("#postDialog");
		dialog.close();

		// save post to local storage
		let posts = JSON.parse(localStorage.getItem("posts")) || [];
		posts.unshift(post);
		localStorage.setItem("posts", JSON.stringify(posts));
		// reload posts
		loadPosts(posts);
	});

	// when the dialog is closed, reset the form
	let dialog = document.querySelector("#postDialog");
	dialog.addEventListener("close", function () {
		document.querySelector("#postForm").reset();
	});

}
