import React, { Fragment } from 'react';
import SideDrawer from '../SideDrawer/SideDrawer';
import NavigationItems from '../NavigationItems/NavigationItems';
import Box from '@material-ui/core/Box';

const Toolbar = () => {
  return (
    <Fragment>
      <Box display={{xs:'block', sm:'block', md:'none', lg:'none', xl:'none'}}>
        <SideDrawer/>
      </Box>
      <Box display={{xs:'none', sm:'none', md:'block', lg:'block', xl:'block'}}>
        <NavigationItems className="DesktopOnly" />
      </Box>
    </Fragment>
  )
}

export default Toolbar;