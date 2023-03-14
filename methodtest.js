window.addEventListener('load', function () {
	init();
});

function init() {
	let form = document.getElementById('methodtest');

	let formDate = document.getElementById('article_date');
	formDate.value = new Date().toISOString().slice(0, 10);

	let output = document.getElementById('response');

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		let action = e.submitter.formAction;
		let id = e.submitter.id;
		let formData = new FormData(form);
		let method;

		switch (id) {
			case 'getBtn':
				method = 'GET';
				break;
			case 'postBtn':
				method = 'POST';
				break;
			case 'putBtn':
				method = 'PUT';
				break;
			case 'deleteBtn':
				method = 'DELETE';
				break;
			default:
				method = 'GET';
		}

		console.log('method: ' + method);
		console.log('action: ' + action);

		if (method == 'GET') {
			action += '?';
			action += new URLSearchParams(formData).toString();
		}

		// create a xhr request 
		let xhr = new XMLHttpRequest();

		xhr.open(method, action, true);

		xhr.onload = function () {
			// console log each response header
			console.log(this.response, typeof this.response);

			// convert response to HTML
			let response = convertResponseToHTML(JSON.parse(this.response));

			// display response
			output.innerHTML = response;
		}

		xhr.send(formData);

		output.innerHTML = 'Loading...';
	});
}

function convertResponseToHTML(response) {
	let html = "<table>";

	if (response.args) {
		html += `<tr><th colspan='2'>Args</th></tr>`;

		if (Object.keys(response.args).length == 0) {
			html += `<tr><td colspan='2'>No args</td></tr>`;
		} else {
			for (let key in response.args) {
				html += `<tr><td>${htmlEntities(key)}</td><td><pre>${htmlEntities(response.args[key])}</pre></td></tr>`;
			}
		}
	}

	if (response.form) {
		html += `<tr><th colspan='2'>Form Data</th></tr>`;
		for (let key in response.form) {
			html += '<tr>'
			html += `<td>${htmlEntities(key)}</td><td><pre>${htmlEntities(response.form[key])}</pre></td>`;
			html += '</tr>';
		}
	}

	if (response.headers) {
		html += `<tr><th colspan='2'>Headers</th></tr>`;
		for (let key in response.headers) {
			html += '<tr>'
			html += `<td>${htmlEntities(key)}</td><td>${htmlEntities(response.headers[key])}</td>`;
			html += '</tr>';
		}
	}


	if (response.origin) {
		html += `<tr><th colspan='2'>Origin</th></tr>`;
		html += `<tr><td colspan='2'>${htmlEntities(response.origin)}</td></tr>`;
	}

	if (response.url) {
		html += `<tr><th colspan='2'>URL</th><tr>`;
		html += `<tr><td colspan='2'>${htmlEntities(response.url)}</td></tr>`;
	}

	html += `</table>`;

	// console.log(html);
	return html;
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}