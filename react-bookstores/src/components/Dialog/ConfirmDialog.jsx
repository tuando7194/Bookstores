import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from 'components/CustomButtons/Button';
import Icon from "@material-ui/core/Icon/Icon";
import './styles.css';

export default class ConfirmDialog extends React.Component {
	handleClose = () => {
		this.props.onClose();
	};

	handleSubmit = () => {
		this.props.onSubmit();
	};

	handleChange = name => event => {
		const fields = this.state.fields;
		fields[name] = event.target.value;
		this.setState({ fields });
	};

	render() {
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
					className="wrapper-confirm-dialog"
				>
						<DialogContent style={{width: '478px'}}>
							<Icon style={{fontSize: '90px', color: 'rgb(238, 162, 54)'}}>warning</Icon>
							<h2>Are you sure?</h2>
							<div className="text-muted lead">You will not be able to recover this item!</div>
							<DialogActions style={{justifyContent: 'center', marginTop: '25px'}}>
								<Button onClick={this.handleClose} color="danger" focus={true}>
									Cancel
								</Button>
								<Button onClick={this.handleSubmit} color="success">
									Yes, delete it!
								</Button>
							</DialogActions>
						</DialogContent>
				</Dialog>
			</div>
		);
	}
}