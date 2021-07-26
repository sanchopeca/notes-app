import React, {useContext, useEffect, useState} from 'react';

import { Paper, TextField, Grid, Button, Box, useMediaQuery } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AuthContext from '../../../store/AuthContext';
import uuid from 'react-uuid';


const Main = ({onAddNote, editNote, onUpdateNote}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const authCtx = useContext(AuthContext);

  const isMobile = useMediaQuery(`(max-width: 1280px)`);

  const userId = authCtx.userId;

  useEffect(() => {
    if (!editNote) {
      setTitle('');
      setBody('');
    }else{
      setTitle(editNote.title);
      setBody(editNote.body);
    } 
  }, [editNote])

  const submitHandler = (event) => {
    event.preventDefault();

    const newNote = {
      id: uuid(),
      userId: userId,
      title: title,
      body: body,
      lastModified: new Date(Date.now())
      // lastModified: new Date(Date.now()).toLocaleDateString("en-US", {
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   second: "2-digit"
      // })
    };

    !editNote ? onAddNote(newNote) : onUpdateNote(newNote);
    setTitle('');
    setBody('');
  }

  return (
      <form onSubmit={submitHandler}>
        <Box mt={!isMobile ? '40px' : '2px'}>
          <Paper elevation={3}>
            <Box p={!isMobile ? '2em' : '1em'} >
              <Grid 
                container 
                direction="column"
                spacing={10}
                >
                    <Grid item>
                      <TextField
                      id="title"
                      type="string"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus
                      fullWidth
                      label="Title"
                      placeholder="Enter new Title..."
                      />
                    </Grid>
                    <Grid item>
                      <TextField 
                      id="body"
                      type="string"
                      value={body}
                      onChange={(e) => {
                        setBody(e.target.value)
                      }}
                      variant="outlined"
                      multiline
                      rows={isMobile ? 5 : 20}
                      rowsMax={20}
                      fullWidth
                      label="Note"
                      placeholder="Enter your note here..."
                      />
                    </Grid>
                    <Grid item >
                      {title || body ?
                      <Button 
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<SaveIcon/>}>
                        Save
                      </Button>
                      :
                      <Button 
                      disabled
                      variant="contained"
                      color="primary"
                      endIcon={<SaveIcon/>}>
                        Save
                      </Button>
                    }
                    </Grid>
                </Grid>
            </Box>
          </Paper>
        </Box>
      </form>
  );
};

export default Main;