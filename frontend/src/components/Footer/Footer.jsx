import React from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BottomNavigation, BottomNavigationAction, Paper, Typography } from "@mui/material";

const Footer = () => {
    const [value, setValue] = React.useState(0);

    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0, boxShadow: 'none', textAlign: 'center' }}
        >
            <Typography variant="h6">Тимофеев Александр. Группа 201-321</Typography>
        </Paper>
    );
};

export default Footer;
