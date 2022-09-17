import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AppBar, Paper } from '@material-ui/core'
import useStyles from './styles'
import { useNavigate, Link  } from 'react-router-dom';
import { Alert } from '@mui/material';
import { signIn, signUp } from '../actions/object';
import Toolbar from '@mui/material/Toolbar';


const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

export default function SignUp() {
  const [isSignup, setIsSignup] = useState(false)
  const classes = useStyles()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [alertMessage, setAlertMessage] = useState()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if all fields filled out
    if(isSignup && (!formData.firstName || !formData.lastName || !formData.email || !formData.password))
    {
      setAlertMessage("Please enter all required fields")
    }

    // Check if passwords are matched
    else if(isSignup && (formData.password !== formData.confirmPassword))
    {
      setAlertMessage("Password do not match")
    }

    // Proceed to signup or signin
    else
    {
      if(isSignup)
      {
        const msg = await signUp(formData, navigate)

        if(msg)
          setAlertMessage(msg)       
      }
      else
      {
        const msg = await signIn(formData, navigate)
        if(msg)        
          setAlertMessage(msg)
        
      }
    }  
  }

  return (
    <div>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Typography style={{
            fontFamily: 'Franklin Gothic Medium',
            color: 'rgb(35, 38, 35)',
            textDecoration: 'none',
            fontSize: '30px',}} component={Link} to='/'><b>My porfolio</b>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        {alertMessage && ( 
          <Grid className={classes.alert}>    
            <Alert severity="error">{alertMessage}</Alert>
          </Grid>    
        )}
        <Paper className={classes.paper} elevation={6}>       
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ marginBottom:2 }}>{isSignup ? 'Sign up' : 'Sign In'}</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && 
              (<>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              </>)
              }
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              {isSignup && 
              (<Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>)}
            </Grid>
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}>
                {isSignup ? 'Sign Up' : 'Sign in'}
              </Button>
            </form>
            <Grid container justifyContent="flex-end">                
              { isSignup ?
                (<Grid item>
                    <Button variant="body2" onClick={() => {setIsSignup(false); setAlertMessage('')}}>Already have an account? Sign in</Button>
                </Grid>) :
                 (<Grid item>
                    <Button variant="body2" onClick={() => {setIsSignup(true); setAlertMessage('')}}>Don't have an account? Sign up</Button>
                </Grid>)}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}