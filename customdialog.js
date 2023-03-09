
export let customAlertFunc = function (alertMsg = "") {
	// get the dialog element
	let dialog = document.querySelector("dialog");
	// get the template for the alert dialog
	let alertTemplate = document.querySelector("#alertTemplate");
	// clone the template
	let alertTemplateClone = alertTemplate.cloneNode(true);
	// set the message in the template clone
	alertTemplateClone.content.querySelector("p").innerHTML = alertMsg;
	// set the dialog content to the template clone
	dialog.innerHTML = alertTemplateClone.innerHTML;
	// add event listener to the close button
	dialog.querySelector("button").addEventListener("click", function alertClose() {
		dialog.close();
	});
	// show the dialog
	dialog.showModal();
	// when the dialog is closed, remove the template clone from the dialog
	dialog.addEventListener("close", function () {
		dialog.innerHTML = '';
	});
}

export let customConfirmFunc = function (confirmMsg = "") {
	// get the dialog element
	let dialog = document.querySelector("dialog");
	// get the template for the confirm dialog
	let confirmTemplate = document.querySelector("#confirmTemplate");
	// clone the template
	let confirmTemplateClone = confirmTemplate.cloneNode(true);
	// set the message in the template clone
	confirmTemplateClone.content.querySelector("p").innerHTML = confirmMsg;
	// set the dialog content to the template clone
	dialog.innerHTML = confirmTemplateClone.innerHTML;

	let answer = false ;

	// add event listener to the confirm button set the answer to true and close the dialog
	dialog.querySelector("#confirm").addEventListener("click", function () {
		answer = true;
		dialog.close();
	});
	// add event listener to the cancel button to just close the dialog
	dialog.querySelector("#cancel").addEventListener("click", function () {
		dialog.close();
	});
	// show the dialog
	dialog.showModal();	
	// when the dialog is closed, remove the template clone from the dialog and return the answer
	return new Promise((resolve) => {
		dialog.addEventListener("close", function () {
			resolve(answer);
			dialog.innerHTML = '';
		});
	});
}

export let customPromptFunc = function (promptMsg = "") {
	// get the dialog element
	let dialog = document.querySelector("dialog");
	// get the template for the prompt dialog
	let promptTemplate = document.querySelector("#promptTemplate");
	// clone the template
	let promptTemplateClone = promptTemplate.cloneNode(true);
	// set the message in the template clone
	promptTemplateClone.content.querySelector("p").innerHTML = promptMsg;
	// set the dialog content to the template clone
	dialog.innerHTML = promptTemplateClone.innerHTML;

	let answer = null;
	// when the confirm button is clicked, set the answer to to the input value 
	dialog.querySelector("#confirm").addEventListener("click", function () {
		answer = dialog.querySelector("input").value;
		dialog.close();
	});
	// when the cancel button is clicked, just close the dialog
	dialog.querySelector("#cancel").addEventListener("click", function () {
		dialog.close();
	});

	dialog.showModal();	
	// return the answer when the dialog is closed
	return new Promise((resolve) => {
		dialog.addEventListener("close", function () {
			resolve(answer);
			dialog.innerHTML = '';
		});
	});
}