class ButtonCount extends HTMLElement {
	  constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = `<button type='button'>Number of Clicks: 0</button>`;
		shadow.querySelector('button').addEventListener('click', this._onClick.bind(this));
	}

	_onClick() {
		const count = Number(this.shadowRoot.querySelector('button').innerText.replace('Number of Clicks: ', ''));
		this.shadowRoot.querySelector('button').innerText = `Number of Clicks: ${count + 1}`;
	}
}

customElements.define('button-count', ButtonCount);