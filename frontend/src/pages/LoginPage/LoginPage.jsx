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
import {Link as RouterLink} from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import user from "../../store/user";

const LoginPage = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email.length < 1) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
        if (password.length < 1) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }

        if (!emailError && !passwordError) {
            axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login/`, {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
                .then(res => res.data)
                .then(({access}) => {
                    localStorage.setItem('access', access)
                    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user/`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${access}`,
                        },
                        withCredentials: true
                    })
                        .then(res => res.data)
                        .then(data => user.setUser(data))
                })
        }
    }

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
                    Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={passwordError}
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
                            <Link component={RouterLink} to="/register" variant="body2">
                                Don't have an account? Create it
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;