import React, { useState } from 'react';
import { 
  Button,
  CardContent,
  IconButton,
  InputAdornment,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import visibilityIcon from '../../assets/generic/visibility.svg';
import visibilityOffIcon from '../../assets/generic/visibility-off.svg';
import productIcon from "../../assets/generic/product-icon.svg"
import { emailRegex, passwordRegex, nameRegex } from "../../constants/regex"

export default function RegistrationForm(props) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showError, setShowError] = useState({ 
    errorFirstName: false,
    errorLastName: false,
    errorEmail: false,
    errorPassword: false,
    errorConfirmPassword: false
  })

  const handleRegister = (event) => {
    event.preventDefault()
    if (!nameRegex.test(firstName)) {
      setShowError({ ...showError, errorFirstName: true })
      return
    }
    if (!nameRegex.test(lastName)) {
      setShowError({ ...showError, errorLastName: true })
      return
    }
    if (!emailRegex.test(email)) {
      setShowError({ ...showError, errorEmail: true })
      return
    }
    if (!passwordRegex.test(password)) {
      setShowError({ ...showError, errorPassword: true })
      return
    }
    if (confirmPassword !== password) {
      setShowError({ ...showError, errorConfirmPassword: true })
      return
    }
    // [TM]: TODO WDB-28
    props.onRegister(firstName, lastName, email, password)
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
    setShowError({ ...showError, errorFirstName: false })
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
    setShowError({ ...showError, errorLastName: false })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setShowError({ ...showError, errorEmail: false })
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setShowError({ ...showError, errorPassword: false })
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    setShowError({ ...showError, errorConfirmPassword: false })
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)
  const handleMouseDownPassword = (event) => event.preventDefault()

  return (
    <Paper elevation={3}>
      <CardContent
        direction="column"
        align="center"
        justify="center"
      >
        <img
          src={productIcon}
          alt="Video library logo"
          width={50}
          height={50}
        />
        <Typography gutterBottom variant="h4">Register</Typography>
        <form noValidate onSubmit={handleRegister}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    error={showError.errorFirstName}
                    helperText={showError.errorFirstName ? "Please enter a valid name" : ""}
                    type="text"
                    id="first-name-field"
                    label="First Name"
                    placeholder="John"
                    variant="outlined"
                    fullWidth
                    onChange={handleFirstNameChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    error={showError.errorLastName}
                    helperText={showError.errorLastName ? "Please enter a valid name" : ""}
                    type="text"
                    id="last-name-field"
                    label="Last Name"
                    placeholder="Doe"
                    variant="outlined"
                    fullWidth
                    onChange={handleLastNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    error={showError.errorEmail}
                    helperText={showError.errorEmail ? "Please enter a valid email" : ""}
                    type="email"
                    id="email-field"
                    label="Email Address"
                    placeholder="email@domain.com"
                    variant="outlined"
                    fullWidth
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    error={showError.errorPassword}
                    helperText={showError.errorPassword ? "Password must have at least 8 symbols with at least one capital letter and at least one number" : ""}
                    type={showPassword ? "text" : "password"}
                    id="password-field"
                    label="Password"
                    placeholder="**********"
                    variant="outlined"
                    fullWidth
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {
                                showPassword ? 
                                  <img src={visibilityOffIcon} alt="Password visibility icon" width={24} height={24} />
                                  : <img src={visibilityIcon} alt="Password visibility off icon" width={24} height={24} />
                              }
                            </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="form__last-text-field"
                    required
                    error={showError.errorConfirmPassword}
                    helperText={showError.errorConfirmPassword ? "Passwords do not match" : ""}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password-field"
                    label="Confirm Password"
                    placeholder="**********"
                    variant="outlined"
                    fullWidth
                    onChange={handleConfirmPasswordChange}
                    InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {
                                showConfirmPassword ? 
                                  <img src={visibilityOffIcon} alt="Password visibility icon" width={24} height={24} />
                                  : <img src={visibilityIcon} alt="Password visibility off icon" width={24} height={24} />
                              }
                            </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth href="/">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Paper>
  )
}