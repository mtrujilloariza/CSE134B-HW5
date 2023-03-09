import { loadPosts } from "./postLoader.js";

export let deletePost = function (index) {
	// get Posts from local storage
	let posts = JSON.parse(localStorage.getItem("posts")) || [];
	// remove post at index
	posts.splice(index, 1);
	// save posts to local storage
	localStorage.setItem("posts", JSON.stringify(posts));
	// reload posts
	loadPosts(posts);
}

export let updatePost = function (index, title, date, content) {
	// get Posts from local storage
	let posts = JSON.parse(localStorage.getItem("posts")) || [];
	// update post at index
	posts[index].title = title;
	posts[index].date = date;
	posts[index].content = content;
	// save posts to local storage
	localStorage.setItem("posts", JSON.stringify(posts));
	// reload posts
	loadPosts(posts);
}