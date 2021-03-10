import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { connect } from 'react-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    height: '100%',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid container>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem et
      dolorem aut, consequuntur nihil mollitia ea ipsa. Qui ipsum iste cumque a
      accusamus itaque commodi doloremque. Cupiditate consectetur quas
      voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
      hic, vero, optio expedita soluta nesciunt ullam illo quisquam similique
      illum distinctio laudantium tempore? Adipisci quia quae at quibusdam
      temporibus facere. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Possimus officiis repellendus aliquam cumque sit rerum facilis ipsum
      exercitationem eveniet voluptate ut, explicabo veniam temporibus optio
      quae? Sapiente optio dolore quasi!
    </Grid>
  );
};

export default Dashboard;
