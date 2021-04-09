import PropTypes from 'prop-types';
import { Fragment } from 'react';
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
  Book as BookIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';

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
  logo: {
    margin: '0 auto',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listitem: { padding: theme.spacing(2) },
  active: {
    background: '#f4f4f4',
  },
}));

export const Navbar = ({ mobileOpen, setMobileOpen }) => {
  const classes = useStyles();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const menuLists = [
    {
      name: 'Home',
      icon: <HomeIcon color="primary" />,
      link: '/',
    },
    {
      name: 'Teachers',
      icon: <PersonIcon color="primary" />,
      link: '/teachers',
    },
    {
      name: 'Students',
      icon: <PeopleIcon color="primary" />,
      link: '/students',
    },
    {
      name: 'Curriculums',
      icon: <BookIcon color="primary" />,
      link: '/curriculums',
    },
  ];

  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ margin: '0' }}>LOGO</h1>
      </div>
      <Divider />
      <List>
        {menuLists.map((list, index) => {
          return (
            <ListItem
              button
              component={Link}
              to={list.link}
              key={index}
              className={
                location.pathname === list.link ? classes.active : null
              }
            >
              <ListItemIcon>{list.icon}</ListItemIcon>
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
      <Hidden lgUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
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
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
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
