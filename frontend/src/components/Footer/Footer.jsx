import React from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {BottomNavigation, BottomNavigationAction, Paper, Typography, Box, Container} from "@mui/material";

const Footer = () => {
    const [value, setValue] = React.useState(0);

    return (


        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h6" style={{
                    marginTop: '50px', boxShadow: 'none',
                    textAlign: 'center',
                }}>
                    Тимофеев Александр. Группа 201-321
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
