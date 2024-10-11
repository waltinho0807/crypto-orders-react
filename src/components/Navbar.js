// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Crypto Bot
                </Typography>
                <Button color="inherit" component={Link} to="/orders">
                    Ordens
                </Button>
                <Button color="inherit" component={Link} to="/configure">
                    Configurar
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
