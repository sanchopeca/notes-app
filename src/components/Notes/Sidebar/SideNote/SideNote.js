import React, { Fragment } from 'react';

import {Grid, IconButton, Typography, Paper, Box,Button, useMediaQuery} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

const SideNote = ({note, onDeleteNote, onEditNote}) => {

  const isMobile = useMediaQuery(`(max-width: 790px)`);

  const isExtraSmall = useMediaQuery(`(max-width: 480px`);

  return(
    <Box mb="1px" >
      <Paper elevation={3} >
        <Box p={isMobile ? "5px" : "20px" }>
            <Grid 
            container
            direction="column"
            justify="space-between"
            >
            <Grid container  alignItems="center" justify="space-between" style={{minHeight:'100px'}}>
            {isMobile ? 
                <Fragment>
                    <Grid item xs={12} sm={12} >
                      <Button style={{width: '100%'}} onClick={() => onEditNote(note.name)}>
                       <Grid  container >
                         <Grid item sm={12} xs={12} >
                          <Typography align="left" component="h1" variant="h1" >
                          {isMobile ? note.title && note.title.substr(0, 10) + "..." : null}
                          </Typography>
                         </Grid>
                        <Grid item sm={12} xs={12} style={{marginTop:'30px'}}>
                          <Typography align="left" component="h2" variant="subtitle2">
                            {isMobile ? note.body && note.body.substr(0, 20) + "..." : null}
                          </Typography>
                        </Grid>
                       </Grid>
                      </Button>
                    </Grid>
                    <Grid container  alignItems="center">
                    <Grid item sm={5} xs={5} >
                     <Button style={{width: '100%'}} onClick={() => onEditNote(note.name)}>
                      <Typography align="left" component="p" variant="caption" >
                        {new Date(note.lastModified).toLocaleDateString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit"
                        })}
                      </Typography>
                    </Button>  
                    </Grid>
                    <Grid item sm={6} xs={6} style={{display: 'flex', justifyContent:'flex-end'}}>
                      <IconButton align="justify" color="secondary" onClick={() => onDeleteNote(note.name)}>
                          <DeleteForeverIcon style={{fontSize:"2rem"}}/>
                      </IconButton>
                    </Grid>
                    </Grid>
                </Fragment>
                :
                   <Grid container>
                     <Grid container justify="space-between">
                      <Grid item xs={9} >
                        <Grid 
                        container
                        direction='column'>
                            <Grid item xl={9}>
                              <Typography align="justify" component="h1" variant="h5" >
                              {note.title && note.title.substr(0, 15) + "..."}
                              </Typography>
                            </Grid>
                          <Grid item>
                            <Typography align="left" component="h2" variant="subtitle1">
                              {note.body && note.body.substr(0, 25) + "..."}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item >
                        <IconButton edge="end" align="right" color="primary" onClick={() => onEditNote(note.name)}>
                          <EditRoundedIcon/>
                        </IconButton>
                        <IconButton edge="end" align="justify" color="secondary" onClick={() => onDeleteNote(note.name)}>
                          <DeleteForeverIcon/>
                        </IconButton>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} >
                        <Typography align="right" component="p" variant="subtitle2">
                          Last modified {note.lastModified}
                        </Typography>
                      </Grid>
                   </Grid>
              }
              </Grid>
            </Grid>
        </Box>
      </Paper>
    </Box>  
  );
};

export default SideNote;