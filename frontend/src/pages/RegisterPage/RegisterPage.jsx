import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    TextField,
    Button,
    Grid,
    Link,
    Container
} from "@mui/material";
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";

const RegisterPage = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [redirect, setRedirect] = React.useState(false)
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email.length < 1) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
        if (password.length < 8) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register/`, {
            email, password, username: email.split('@')[0]
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
            .then(res => res.data)
            .then(data => {
                if (data?.message === 'success') {
                    setRedirect(true)
                }
            })
    }

    if (redirect) navigate('/login')
    return (
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={emailError}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={passwordError}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;