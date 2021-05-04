import { Grid } from '@material-ui/core';
import React from 'react';
import { updateCredentials } from '../../api/UserAPI';
import ChangeProfileForm from '../../components/ChangeProfileForm/ChangeProfileForm';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import TopBar from '../../components/TopBar/TopBar';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGeneralError: false,
      showConflictError: false,
      showSuccess: false,
      showWrongPasswordError: false,
    };
  }

  render() {
    const firstName = window.sessionStorage.getItem('firstName');
    const lastName = window.sessionStorage.getItem('lastName');
    const email = window.sessionStorage.getItem('email');
    const {
      showSuccess,
      showConflictError,
      showGeneralError,
      showWrongPasswordError,
    } = this.state;

    const handleArrowBackClick = () => {
      window.location.href = '/library';
    };

    const hideGeneralError = () => {
      this.setState({ showGeneralError: false });
    };

    const hideConflictError = () => {
      this.setState({ showConflictError: false });
    };

    const hideSuccess = () => {
      this.setState({ showSuccess: false });
    };

    const hideWrongPasswordError = () => {
      this.setState({ showWrongPasswordError: false });
    };

    const handleSaveChanges = (mail, oldPassword, newPassword) => {
      const credentials = {
        email: mail,
        oldPassword,
        newPassword,
      };
      updateCredentials(window.sessionStorage.getItem('id'), credentials)
        .then(() => {
          window.sessionStorage.setItem('email', mail);
          this.setState({ showSuccess: true });
        })
        .catch((ex) => {
          if (ex.response === undefined) {
            this.setState({ showConflictError: true });
            return;
          }
          const { status } = ex.response;
          if (status === 409) {
            this.setState({ showConflictError: true });
            return;
          }
          if (status === 400) {
            this.setState({ showWrongPasswordError: true });
            return;
          }
          this.setState({ showGeneralError: true });
        });
    };

    return (
      <>
        {showGeneralError && (
          <CustomSnackbar
            topCenter
            message="A server error has occured. Please try again later"
            onClose={hideGeneralError}
            severity="error"
          />
        )}
        {showConflictError && (
          <CustomSnackbar
            topCenter
            message="User with the email you specified already exists"
            onClose={hideConflictError}
            severity="error"
          />
        )}
        {showWrongPasswordError && (
          <CustomSnackbar
            topCenter
            message="Old password is not correct"
            onClose={hideWrongPasswordError}
            severity="error"
          />
        )}
        {showSuccess && (
          <CustomSnackbar
            topCenter
            message="Credentials changed successfully"
            onClose={hideSuccess}
            severity="success"
          />
        )}
        <Grid container>
          <Grid item>
            <TopBar
              showArrow
              title="Profile page"
              onActionIconClick={handleArrowBackClick}
              showAvatarAndLogout
              firstName={firstName}
              lastName={lastName}
            />
          </Grid>
          <Grid container className="root" alignItems="center" justify="center">
            <Grid item xs={11} sm={6} md={4} lg={3}>
              <ChangeProfileForm
                firstName={firstName}
                lastName={lastName}
                mail={email}
                onSaveChanges={handleSaveChanges}
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ProfilePage;
