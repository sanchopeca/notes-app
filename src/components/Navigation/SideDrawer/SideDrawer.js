import React, {Fragment, useState} from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import {SwipeableDrawer, IconButton, AppBar, Toolbar} from '@material-ui/core';

import './SideDrawer.css';

import MenuIcon from '@material-ui/icons/Menu';

const SideDrawer = () => {

  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <Fragment>
      <AppBar position ="fixed" >
      <Toolbar >
        <IconButton
          edge="start"
          onClick={handleDrawer}
        >
          <MenuIcon style={{color:'white'}}/>
        </IconButton>
        <SwipeableDrawer 
        open={open}
        onOpen={handleDrawer} 
        onClose={handleClose}
        > 
           <NavigationItems drawerIsOpened={open} onDrawerClose={handleClose}/>
        </SwipeableDrawer>
      </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default SideDrawer;