import React, {Fragment} from 'react';

import {Grid, Paper, Box, useMediaQuery } from '@material-ui/core';
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';
import { Typography } from '@material-ui/core';
import SideNote from './SideNote/SideNote';
import Spinner from '../../UI/Spinner/Spinner';

const Sidebar = ({user , notes, onDeleteNote, onEditNote}) => {

  const isMobile = useMediaQuery(`(max-width: 1280px)`);

  const isExtraSmall = useMediaQuery(`(max-width: 440px`);

  const isLaptop = useMediaQuery(`(max-height: 882px)`)

  let noteList = <Spinner/>;


  if(notes) {
     noteList = Object.values(notes).map(note => {
      return (
        <Grid item key={note.name} xs={12} sm={6} md={6} lg={12} xl={12} >
          <SideNote  note={note} dateModified={note.lastModified} onDeleteNote={onDeleteNote} onEditNote={onEditNote}/>
        </Grid>
      )
    });

    noteList.sort((a, b) => new Date(a.props.dateModified) - new Date(b.props.dateModified))

    console.log(noteList,'C')
  }

  return (
    <Fragment>
      <Box mt='30px' overflow={isMobile ? 'visible' : "auto"} p={isMobile ? '1em' : '1em 2em'} maxHeight={isLaptop ? "82vh" : "75vh"}>
        <Grid 
          container
          direction='column'
          >
          <Box mb="2em"  >
            <Paper elevation={3} >
                <Box p="20px" >
                  <Grid 
                    container
                    alignItems='center'
                    justify="space-between"
                    >
                    <Grid item>
                      <Typography component="h1" variant="h4">
                        {user}'s notes
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ArrowDropDownCircleRoundedIcon color="primary"/>
                  </Grid>
                </Grid>
                </Box>
             </Paper>
          </Box>
          {
            isMobile && !isExtraSmall ? 
            <Grid 
            container
            wrap='wrap'
            spacing={2}
            >
            {noteList}
            </Grid>
            :
            <Grid 
            container
            direction= 'column'
            spacing={3}
            >
            {noteList}
            </Grid>
          }
        </Grid>
      </Box>
    </Fragment>
  );
}

export default Sidebar;