import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// Custom import
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { getUser } from 'reducers/user/userReducer';
import { logout } from "../../reducers/auth/loginReducers";
import Avatar from 'assets/img/avatar.png'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },

};


class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        username: '',
        email: '',
        mobileNumber: '',
      },
    }
  }

  componentDidMount() {
    // this.props.getUser();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.authUser.data !== this.props.authUser.data) {
      if(!this.props.authUser.data)
        this.props.history.push("/");
    }
  }

  onInputChange = name => event => {
    const { value } = event.target;
    const { fields } = this.state;
    fields[name] = value;
    this.setState(( fields ));
  }

  onLogout = () => {
    this.props.logout('');
  };

  render() {
    const props = this.props;
    const { classes } = props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      inputProps={{
                        value: this.state.fields.username,
                        onChange: this.onInputChange('username')
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      inputProps={{
                        value: this.state.fields.email,
                        onChange: this.onInputChange('email')
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <CustomInput
                      labelText="Mobile number"
                      id="mobileNumber"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.state.fields.mobileNumber,
                        onChange: this.onInputChange('mobileNumber')
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary">Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={Avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>ADMIN PAGE</h6>
                <h4 className={classes.cardTitle}>{this.state.fields.name}</h4>
                <p className={classes.description}>
                  {this.state.fields.about}
                </p>
                <Button color="danger" round onClick={this.onLogout}>
                  Logout
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { authUser } = state;
  return { authUser };
};

const mapDispatchToProp = dispatch => {
  return {
    dispatch,
    logout: (userId) => dispatch(logout(userId)),
    getUser: () => dispatch(getUser()),
  }
}

export default compose(withStyles(styles), withRouter)(connect(mapStateToProps, mapDispatchToProp)(UserProfile));
