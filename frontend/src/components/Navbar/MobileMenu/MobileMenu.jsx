import React from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

export const MobileMenu = ({ routes }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <>
            <Box
                sx={{
                    display: { xs: "flex", md: "none" },
                }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: "block", md: "none" },
                    }}
                >
                    {routes.map((route) => (
                        <MenuItem key={route.link} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{route.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            {/* TODO: clickable icon */}
            <AdbIcon
                sx={{
                    display: { xs: "flex", md: "none" },
                    mr: 1,
                    flexGrow: 1,
                }}
            />
        </>
    );
};
