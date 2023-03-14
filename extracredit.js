'use strict';

const e = React.createElement;

class ButtonCount extends React.Component {
  constructor(props) {
	super(props);
	this.state = { count: 0 };
  }

  render() {
	return e(
	  'button',
	  { onClick: () => this.setState(state => ({ count: state.count + 1 })) },
	  `Number of Clicks: ${this.state.count}`
	);
  }
}

const domContainer = document.querySelector('#button_count_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(ButtonCount));