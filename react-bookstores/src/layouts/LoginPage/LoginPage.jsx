import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "KIT/components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "KIT/components/Card/Card"
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "KIT/components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
import {loadCSS} from 'fg-loadcss/src/loadCSS';

import {login} from "reducers/auth/loginReducers";
import {Redirect} from "react-router-dom";

import {createErrorMessageSelector, createLoadingSelector} from "api/selectors";
import Loading from "components/Loading/Loading";
import MessageNotification from "components/MessageNotification";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      fields: {
        username: "",
        password: "",
      },
      fieldErrors: {},
      redirectToReferrer: false,
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );

    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.authUser.data !== prevProps.authUser.data) {
      const authUser = this.props.authUser.data;
      if (authUser) {
        this.setState({redirectToReferrer: true});
      }
    }
  }

  // Login by username
  onInputChange = name => event => {
    const { value } = event.target;
    const { fields } = this.state;
    fields[name] = value;
    this.setState({fields});
    this.onValidateField(name, value);
  };

  onValidateField = (name, value) => {
    const { fieldErrors } = this.state;
    switch (name) {
      case 'username':
        fieldErrors.username = value ? '' : 'Username cannot be blank';
        break
      case 'password':
        fieldErrors.password = value ? '' : 'Password  cannot be blank';
        break
      default:
        break
    }
    this.setState({ fieldErrors })
  };

  onSubmit = event => {
    event.preventDefault();
    const { fields } = this.state;
    const fieldErrors = this.validateForm(fields);
    this.setState({ fieldErrors: fieldErrors });
    if (Object.keys(fieldErrors).length) return;
    const { username, password } = this.state.fields;
    this.props.login({ username, password });
  };

  validateForm = (user) => {
    const errors = {};
    if (!user.username) errors.username = 'Username Required';
    if (!user.password) errors.password = 'Password Required';
    return errors;
  };

  render() {
    const { classes, ...rest } = this.props;
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        {this.props.loadingSelector && <Loading/>}
        <MessageNotification open={this.props.errorSelector} message={this.props.errorSelector}/>
        <Header
          absolute
          color="transparent"
          brand="Admin page"
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.onSubmit}>
                    <CardHeader color="warning" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                      </div>
                    </CardHeader>
                    <p className={classes.divider}>Forgot password</p>
                    <CardBody>
                      <CustomInput
                        labelText="Username..."
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "username",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          value: this.state.fields.username,
                          onChange: this.onInputChange('username'),
                        }}
                        error={!!this.state.fieldErrors.username}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          value: this.state.fields.password,
                          onChange: this.onInputChange('password'),
                        }}
                        error={!!this.state.fieldErrors.password}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="warning" size="lg" type="submit">
                        Login
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(['LOGIN']);
const errorSelector = createErrorMessageSelector(['LOGIN']);

const mapStateToProps = state => {
  const { authUser } = state;
  return {
    authUser,
    loadingSelector: loadingSelector(state),
    errorSelector: errorSelector(state)
  }
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  login: (data) => login(data),
});

export default compose(connect(mapStateToProps, mapDispatchToProps()), withStyles(loginPageStyle))(LoginPage);