import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  People as PeopleIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

export const Navbar = ({ mobileOpen, setMobileOpen }) => {
  const classes = useStyles();

  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuItemClick = (e, i) => {
    setSelectedMenu(i);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuLists = [
    {
      name: 'Home',
      icon: () => <HomeIcon />,
      link: '/',
    },
    {
      name: 'Teachers',
      icon: () => <PersonIcon />,
      link: '/teachers',
    },
    {
      name: 'Students',
      icon: () => <PeopleIcon />,
      link: '/students',
    },
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuLists.map((list, index) => {
          return (
            <ListItem
              button
              component={Link}
              to={list.link}
              key={index}
              onClick={(e) => handleMenuItemClick(e, index)}
              selected={selectedMenu === index}
            >
              <ListItemIcon>{list.icon()}</ListItemIcon>
              <ListItemText primary={list.name} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );

  return (
    <Fragment>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden lgUp implementation='css'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.drawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

Navbar.propTypes = {
  mobileOpen: PropTypes.bool,
  setMobileOpen: PropTypes.func.isRequired,
};
