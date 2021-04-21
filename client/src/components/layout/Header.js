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
import { Box } from '@material-ui/core';

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
        <Box flexGrow={1}>
          <Typography variant="h6" noWrap>
            Admin System
          </Typography>
        </Box>
        <Box>
          <Typography>Admin</Typography>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

Header.propTypes = {
  mobileOpen: PropTypes.bool,
  setMobileOpen: PropTypes.func.isRequired,
};
