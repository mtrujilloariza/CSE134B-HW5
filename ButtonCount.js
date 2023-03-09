class ButtonCount extends HTMLElement {
	count = 0;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.innerHTML = `<button type='button'>Number of Clicks: ${this.count}</button>`;
		shadow.querySelector('button').addEventListener('click', () => this.incCount());
	}

	incCount() {
		this.shadowRoot.querySelector('button').innerText = `Number of Clicks: ${++this.count}`;
	}
}

customElements.define('button-count', ButtonCount);