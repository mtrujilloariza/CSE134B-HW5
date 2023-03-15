'use strict';
class ButtonCount extends React.Component {
  constructor(props) {
	super(props);
	this.state = { count: 0 };
  }

  render() {
	return React.createElement(
	  'button',
	  { onClick: () => this.setState(state => ({ count: state.count + 1 })) },
	  `Number of Clicks: ${this.state.count}`
	);
  }
}

const domContainer = document.querySelector('#button_count_container');
const shadow = domContainer.attachShadow({ mode: 'open' });
const root = ReactDOM.createRoot(shadow);
root.render(React.createElement(ButtonCount));