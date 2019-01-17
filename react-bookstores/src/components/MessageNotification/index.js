/* eslint-disable */
import React from "react";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import Snackbar from "components/Snackbar/Snackbar.jsx";

class MessageNotification extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			br: false
		}
	}

	// to stop the warning of calling setState of unmounted component
	componentWillUnmount() {
		var id = window.setTimeout(null, 0);
		while (id--) {
			window.clearTimeout(id);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.open !== prevProps.open) {
			if(this.props.open) {
				this.showNotification('br');
			} else {
				this.setState({br: false})
			}
		}
	}

	showNotification(place) {
		var x = [];
		x[place] = true;
		this.setState(x);
		this.alertTimeout = setTimeout(
			function() {
				x[place] = false;
				this.setState(x);
			}.bind(this),
			6000
		);
	}

	render() {
		return (
			<Snackbar
				place="br"
				color="danger"
				icon={AddAlert}
				message={this.props.message || ''}
				open={this.state.br}
				closeNotification={() => this.setState({ br: false })}
				close
			/>
		);
	}
}

export default MessageNotification;
