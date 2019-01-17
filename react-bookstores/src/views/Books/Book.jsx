import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// Custom import
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { createBook } from "reducers/books/createBookReducers";
import { updateBook } from "reducers/books/updateBookReducers";
import SelectImage from 'components/SelectImage/SelectImage';
import NumberFormat from 'react-number-format';
import './styles.css';

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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="VND "
    />
  );
}

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {
        title: '',
        description: '',
        price: '',
        image: ''
      },
      fieldErrors: {}
    };
  }

  componentDidMount() {
    this.fillForm();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.authUser.data !== this.props.authUser.data) {
      if(!this.props.authUser.data)
        this.props.history.push("/");
    }

    if(this.props.createBookReducers.data !== prevProps.createBookReducers.data) {
      if(this.props.createBookReducers.data)
        this.resetForm();
        this.props.history.push('/books')
    }

    if(this.props.updateBookReducers.data !== prevProps.updateBookReducers.data) {
      const bookUpdated = this.props.updateBookReducers.data;
      if(bookUpdated)
        this.props.onBack()
    }
  }

  fillForm = () => {
    const { data } = this.props;
    if (!data) return;
    const { title, description, price, image } = data;
    this.preImage = image;
    this.setState({ fields: {title, description, price, image} });
  };

  resetForm = () => {
    this.setState({
      fields: {
        title: '',
        description: '',
        price: '',
        image: ''
      }
    });
  };

  onValidateField = (name, value) => {
    const { fieldErrors } = this.state;
    switch (name) {
      case 'title':
        fieldErrors.title = !value ? 'Title Required' : '';
        break
      case 'description':
        fieldErrors.description = !value ? 'Description Required' : '';
        break
      case 'price':
        fieldErrors.price = !value ? 'Price Required' : '';
        break
      case 'image':
        fieldErrors.image = !value ? 'Image Required' : '';
        break
      default:
        break
    }
    this.setState({ fieldErrors })
  };

  onValidateForm = (book) => {
    const errors = {};
    if (!book.title) errors.title = 'Title Required';
    if (!book.description) errors.description = 'Description Required';
    if (!book.price) errors.price = 'Price Required';
    // if (!book.image) errors.image = 'Image Required';
    return errors;
  };

  onInputChange = name => event => {
    const { value } = event.target;
    const fields = this.state.fields;
    fields[name] = value;
    this.setState({fields});
    this.onValidateField(name, value);
  };

  onFileChange = (name, file ) => {
    const { fields } = this.state;
    fields[name] = file;
    this.setState({fields})
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { fields } = this.state;
    const fieldErrors = this.onValidateForm(fields);
    this.setState({fieldErrors});
    if(Object.keys(fieldErrors).length) return;

    const { title, description, price, image } = fields;
    if(this.props.data) {
      const bookId = this.props.data._id;
      console.log('this.preImage', this.preImage)
      this.props.updateBook({bookId, title, description, price, image, preImage: this.preImage});
    }
    else
      this.props.createBook({title, description, price, image});
  };

  render() {
    const props = this.props;
    const { classes } = props;

    return (
      <form onSubmit={this.onSubmitForm}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8} >
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>{this.props.data ? 'Update books' : 'Create books'}</h4>
                <p className={classes.cardCategoryWhite}>Complete book info</p>
              </CardHeader>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      labelText="Title"
                      id="title"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.onInputChange('title'),
                        value: this.state.fields.title
                      }}
                      error={!!this.state.fieldErrors.title}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      labelText="Description"
                      id="description"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.onInputChange('description'),
                        value: this.state.fields.description
                      }}
                      error={!!this.state.fieldErrors.description}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      labelText="Price"
                      id="price"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.onInputChange('price'),
                        value: this.state.fields.price,
                        inputComponent: NumberFormatCustom
                      }}
                      error={!!this.state.fieldErrors.price}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <div
                      className="select-custom"
                    >
                      <InputLabel className="select-label">Image</InputLabel>
                      <SelectImage
                        onChange={(file) => this.onFileChange('image', file )}
                        src={this.state.fields.image}
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter style={{display: "block"}}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10} style={{textAlign: "right"}}>
                    {this.props.data && <Button color="rose" onClick={this.props.onBack}>Back to list</Button>}
                    <Button color="info" type="submit">{this.props.data ? 'Update' : 'Create'}</Button>
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { authUser,	updateBookReducers, createBookReducers,  } = state;
  return { authUser, updateBookReducers, createBookReducers };
};

const mapDispatchToProp = dispatch => {
  return {
    dispatch,
    createBook: (data) => dispatch(createBook(data)),
    updateBook: (data) => dispatch(updateBook(data)),
  }
}

export default compose(withStyles(styles), withRouter)(connect(mapStateToProps, mapDispatchToProp)(Book));
