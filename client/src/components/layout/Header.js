import PropTypes from 'prop-types';
import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

export const Header = ({ mobileOpen, setMobileOpen }) => {
  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const classes = useStyles();

  return (
    <AppBar
      position="relative"
      className={classes.appBar}
      color="primary"
      elevation={1}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Admin System
        </Typography>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

Header.propTypes = {
  mobileOpen: PropTypes.bool,
  setMobileOpen: PropTypes.func.isRequired,
};
