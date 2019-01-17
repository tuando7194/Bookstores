import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
// @material-ui/core components

import {loadBooks} from "reducers/books/listBooksReducers";

import {createErrorMessageSelector, createLoadingSelector} from "api/selectors";
import Loading from "components/Loading/Loading";
import MessageNotification from "components/MessageNotification";
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import GridContainer from "../../components/Grid/GridContainer";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Website extends React.Component {
  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    const { classes, listBooksReducers } = this.props;
    return (
      <div>
        {this.props.loadingSelector && <Loading/>}
        <MessageNotification open={this.props.errorSelector} message={this.props.errorSelector}/>
        <React.Fragment>
          <CssBaseline />
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <CameraIcon className={classes.icon} />
              <Typography variant="h6" color="inherit" noWrap>
                Bookstore
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  Bookstore
                </Typography>
              </div>
            </div>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              {/* End hero unit */}
              <Grid container spacing={40}>
                {listBooksReducers.data && listBooksReducers.data.map(card => (
                  <Grid item key={card._id} sm={6}>
                    <Card className={classes.card}>
                      <GridContainer>
                        <Grid sm={6}>
                          <img src={card.image} alt='' style={{ width:'100%', padding: '30px' }}/>
                        </Grid>
                        <Grid sm={6}>
                         <div style={{paddingRight: '30px'}}>
                           <h3 style={{fontWeight: 'bold'}}>{card.title}</h3>
                           <p style={{fontWeight: 'bold'}}>{card.description}</p>
                           <p>{`Giá ${Number(card.price).toLocaleString()} VND`}</p>
                         </div>
                        </Grid>
                      </GridContainer>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
          </footer>
          {/* End footer */}
        </React.Fragment>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(['LOAD_BOOKS']);
const errorSelector = createErrorMessageSelector(['LOAD_BOOKS']);

const mapStateToProps = state => {
  const { listBooksReducers } = state;
  return {
    loadingSelector: loadingSelector(state),
    errorSelector: errorSelector(state),
    listBooksReducers,
  }
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  loadBooks: (data) => loadBooks(data),
});

export default compose(connect(mapStateToProps, mapDispatchToProps()), withStyles(styles))(Website);