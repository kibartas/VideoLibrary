import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import LoginForm from '../components/LoginForm/LoginForm';
import sideImage from '../assets/generic/side-image.svg';

class LoginPage extends React.Component {
  render() {
    return (
      <Grid
        container
        justify="space-around"
        style={{ height: '100vh' }}
        direction="row"
        alignItems="center"
      >
        <Hidden smDown>
          <Grid item>
            <img
              src={sideImage}
              alt="Two people looking at their smart devices in front of a video screen"
            />
          </Grid>
        </Hidden>
        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>
    );
  }
}

export default LoginPage;
