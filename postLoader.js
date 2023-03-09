import { customConfirmFunc } from "./customdialog.js";
import { deletePost, updatePost } from "./postUpdater.js";

export let loadPosts = function (posts) {
	// get the post div
	let postDiv = document.querySelector("#posts");
	// clear the post div
	postDiv.innerHTML = '';

	// loop through the posts
	for (let post of posts) {
		// get the post template and clone it
		let postTemplate = document.querySelector("#postTemplate");
		let postTemplateClone = postTemplate.cloneNode(true);
		// set the post title, date and content
		postTemplateClone.content.querySelector(".postTitle").innerHTML = post.title;
		postTemplateClone.content.querySelector(".postDate").innerHTML = post.date;
		postTemplateClone.content.querySelector(".postContent").innerHTML = post.content;

		// add event listener to delete button and call the custom confirm function
		postTemplateClone.content.querySelector(".delete").addEventListener("click", function () {
			let deleteAns = customConfirmFunc("Are you sure you want to delete this post?");
			// if the answer is true, call the deletePost function
			deleteAns.then(function (answer) {
				if (answer) {
					deletePost(posts.indexOf(post));
				}
			});
		});

		// add event listener to edit button
		postTemplateClone.content.querySelector(".edit").addEventListener("click", function () {
			let dialog = document.querySelector("#updateDialog");
			//get update form template and clone it
			let updateFormTemplate = document.querySelector("#updateFormTemplate");
			let updateFormTemplateClone = updateFormTemplate.cloneNode(true);
			//add the cloned template to the dialog
			dialog.innerHTML = updateFormTemplateClone.innerHTML;
			//set the form values to the post values
			dialog.querySelector("#updateFormTitle").value = post.title;
			dialog.querySelector("#updateFormDate").value = post.date;
			dialog.querySelector("#updateFormContent").value = post.content;
			// show the dialog
			dialog.showModal();
			// when the dialog is closed, remove the template clone from the dialog
			dialog.addEventListener("close", function () {
				dialog.innerHTML = '';
			});
			// add event listener to the cancel button to just close the dialog
			dialog.querySelector("#cancelUpdate").addEventListener("click", function () {
				dialog.close();
			});
			// add event listener to the update button to update the post and close the dialog
			dialog.querySelector("#updatePostForm").addEventListener("submit", function (e) {
				e.preventDefault();
				updatePost(posts.indexOf(post), dialog.querySelector("#updateFormTitle").value, dialog.querySelector("#updateFormDate").value, dialog.querySelector("#updateFormContent").value);
				dialog.close();
			});

		});
		// add the post to the post div
		postDiv.appendChild(postTemplateClone.content);
	}
}