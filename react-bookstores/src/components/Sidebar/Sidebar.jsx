import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import "./styles.css";
import { isEmpty } from 'utils/helpers';

class Sidebar extends React.Component {

  state = {
    open: {}
  };

  handleToggle = (prop) => {
    const open = this.state.open;
    open[prop.sidebarName] = !open[prop.sidebarName];
    this.setState({ open });
  };

  componentDidMount() {
    const routersDropdow = this.props.routes.filter(x => x.children);
    for(let route of routersDropdow) {
      for(let item of route.children) {
        if(this.activeRoute(item.path))
          this.setState({open:{[route.sidebarName] : true}})
      }
    }
  }

  activeRoute = (routeName) => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  render() {
    // verifies if routeName is the one active (in browser input)

    const props = this.props;
    const { classes, color, logo, image, logoText, routes } = props;
    const filterRoutes = routes.filter(x => x.sidebarName && x.navbarName);
    var links = (
      <List className={classes.list}>
        {filterRoutes.map((prop, key) => {
          if (prop.redirect) return null;
          var listItemClasses;
          if (prop.redirect) return null;
          var activePro = " ";
          if(prop.children) {
            listItemClasses = classNames({
              [" " + classes[color]]: this.activeRoute(prop.children.path)
            });
          } else {
            listItemClasses = classNames({
              [" " + classes[color]]: this.activeRoute(prop.path)
            });
          }
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: this.activeRoute(prop.path)
          });

          return prop.children ? (
            <div
              className={activePro + classes.item}
              key={key}
            >
              <ListItem
                onClick={() => this.handleToggle(prop)}
                button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                    <prop.icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />
                {
                  prop.children
                  && <i className={"material-icons icon-dropdown" + " " +
                  (!isEmpty(this.state.open) ? (this.state.open[prop.sidebarName] ? "rotate-open" : "rotate-close") : "")}>
                    arrow_drop_up
                  </i>
                }
              </ListItem>
              {prop.children  &&
              <List className={"dropdown-content " + (this.state.open !== {} && (this.state.open[prop.sidebarName] ? "dropdown-conten-open" : "dropdown-conten-close"))}
                    style={{maxHeight: `${prop.children.length * 51}px`}}
              >
                {prop.children.map((subItem, key) =>
                  <NavLink
                    to={subItem.path}
                    className={activePro + classes.item}
                    style={{margin: "0 15px"}}
                    activeClassName="active"
                    key={key}
                  >
                    <ListItem button className={classes.itemLink + (this.activeRoute(subItem.path) && (" " + classes[color]))} style={{margin: 0, marginTop: "10px", padding: '10px 15px', display: 'block', borderRadius: "3px"}}>
                      <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                        <span style={{fontSize: '14px', lineHeight: '1.5em', height: 'unset'}}>{subItem.icon}</span>
                      </ListItemIcon>
                      <ListItemText
                        primary={subItem.sidebarName}
                        className={classes.itemText + whiteFontClasses}
                        style={{
                          lineHeight: '1.5em'
                        }}
                        disableTypography={true}
                      />
                    </ListItem>
                  </NavLink>
                )}
              </List>}
            </div>
          ): (
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem
                onClick={() => this.handleToggle(prop)}
                button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                    <prop.icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          )
        })}
      </List>
    );
    var brand = (
      <div className={classes.logo}>
        <a href="/" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </a>
      </div>
    );
    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
              <HeaderLinks />
              {links}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
