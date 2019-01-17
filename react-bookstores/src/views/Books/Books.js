import React from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {withRouter} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import ConfirmDialog from "components/Dialog/ConfirmDialog";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button";

import { loadBooks } from "../../reducers/books/listBooksReducers";
import { loadBook } from "../../reducers/books/getBookReducers";
import { delBook } from "../../reducers/books/delBookReducers";
import BookUpdate from 'views/Books/Book';
import MaterialTable, { MTableToolbar } from 'material-table'
import {loadCSS} from 'fg-loadcss/src/loadCSS';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      openEditBook: false,
      currentBook: false
    }
  }

  componentDidMount() {
    this.props.loadBooks();
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.delBookReducers.data !== prevProps.delBookReducers.data) {
      if(this.props.delBookReducers.data) {
        this.handleDeleteDialogClose();
      }
    }
  }

  // Delete book dialog
  handleDeleteDialogClose = () => this.setState({openDeleteDialog: false});
  handleDeleteDialogOpen = () => this.setState({openDeleteDialog: true});

  handleDeleteBook = (book) => {
    this.handleDeleteDialogOpen();
    this.setState({currentBook: book})
  };


  handleDeleteDialogSumit = () => {
    const { currentBook } = this.state;
    const bookId = currentBook && currentBook._id;
    this.props.delBook({ bookId });
  };

  // Edit book didalog
  handleEditBookClose = () => this.setState({openEditDialog: false});
  handleEditBookOpen = () => this.setState({openEditDialog: true});

  handleEditBook = (book) => {
    const bookId = book._id;
    this.setState({currentBook: book})
    this.props.loadBook({ bookId });
    this.handleEditBookOpen();
  };

  render() {
    const { classes, listBooksReducers, getBookReducers } = this.props;
    return (
      <React.Fragment>
        {
          this.state.openEditDialog && getBookReducers.data ?
            <BookUpdate
              data={getBookReducers.data}
              onBack={this.handleEditBookClose}
            />
            :
            <GridContainer>
              {
                this.state.openDeleteDialog &&
                <ConfirmDialog
                  open={this.state.openDeleteDialog}
                  onSubmit={this.handleDeleteDialogSumit}
                  onClose={this.handleDeleteDialogClose}
                  onBack={this.handleEditBookClose}
                />
              }
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="info">
                    <h4 className={classes.cardTitleWhite}>List books</h4>
                    <p className={classes.cardCategoryWhite}>
                      Here is a subtitle for this list books
                    </p>
                  </CardHeader>
                  <CardBody>
                    <MaterialTable
                      components={{
                        Toolbar: props => (
                          <GridContainer>
                            <GridItem md={6}>
                              <div style={{margin: '12px 0 0 12px'}}>
                                <Button color='info' onClick={() => this.props.history.push('/createBook')}>Create book</Button>
                              </div>
                            </GridItem>
                            <GridItem md={6}>
                              <MTableToolbar {...props} />
                            </GridItem>
                          </GridContainer>
                        ),
                      }}
                      columns={[
                        { title: 'ID', field: '_id' },
                        { title: 'Image', field: 'image',
                          render: rowData => {
                            return (
                              <img  src={rowData.image} alt='' height={80}/>
                            )
                          }
                        },
                        { title: 'Title', field: 'title', },
                        { title: 'Description', field: 'description' },
                        { title: 'Price', field: 'price',
                          render: rowData => {
                            return (
                              <p>{`VND ${rowData.price && Number(rowData.price).toLocaleString()}`}</p>
                            )
                          }},
                        { title: 'CreatedAt', field: 'createdAt' },
                      ]}
                      data={listBooksReducers.data || []}
                      title=""
                      actions={[
                        {
                          icon: 'edit',
                          tooltip: 'Edit book info',
                          onClick: (event, rowData) => {
                            this.handleEditBook(rowData)
                          },
                        },
                        rowData => ({
                          icon: 'delete',
                          tooltip: 'Delete book info',
                          disabled: rowData.birthYear >= 2000,
                          onClick: (event, rowData) => {
                            this.handleDeleteBook(rowData)
                          },
                        }),
                      ]}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { createBookReducers, getBookReducers, listBooksReducers, delBookReducers } = state;
  return { createBookReducers, getBookReducers, listBooksReducers, delBookReducers };
};

const mapDispatchToProp = dispatch => {
  return {
    dispatch,
    loadBooks: () => dispatch(loadBooks()),
    loadBook: (data) => dispatch(loadBook(data)),
    delBook: (data) => dispatch(delBook(data)),
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProp), withStyles(styles), withRouter )(Books);