import React from 'react';
import User from '../../store/user'
import {toJS} from "mobx";
import {Container, Typography} from "@mui/material";

const ProfilePage = () => {
    let user = toJS(User.getUser())
    return (
        <Container>
            <Typography variant="h2" align="center">Hello, {user?.username}</Typography>
        </Container>
    );
};

export default ProfilePage;