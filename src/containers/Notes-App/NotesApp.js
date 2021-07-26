import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';


import {Grid, Container, Box, IconButton, useMediaQuery} from '@material-ui/core';
import Sidebar from '../../components/Notes/Sidebar/Sidebar';
import Main from '../../components/Notes/Main/Main';
import AuthContext from '../../store/AuthContext';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';



const NotesApp = () => {

  const [notes, setNotes] = useState(null);
  const [editNote, setEditNote] = useState(null);
  const [active, setActive] = useState(true);

  const isMobile = useMediaQuery(`(max-width: 1280px)`);



  const authCtx = useContext(AuthContext);

  const token = authCtx.token;
  const user = authCtx.userName;
  const userId = authCtx.userId;

  const fetchNotes = useCallback(() => {
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; 
    axios.get('https://notes-app-bfc11-default-rtdb.firebaseio.com/notes.json' + queryParams)
    .then(res => {
      if(res){
        
        const fetchedNotes = Object.values(res.data);

        const transformedNotes = fetchedNotes.map(noteData => {
          return {
            id: noteData.id,
            userId: noteData.userId,
            title: noteData.title,
            body: noteData.body,
            lastModified: noteData.lastModified
          }
        })  

        const fetchedNames = Object.keys(res.data);

        const transformedNames = fetchedNames.map( name => {
          return {
            name: name
          }
        })
        
        let fetchedData = Object.keys(transformedNames).reduce((acc, key) => {
          acc[key] = {...transformedNames[key], ...transformedNotes[key]}
          return acc;
        }, {})

        const transformedFetchedData = Object.values(fetchedData).sort((a, b) => {

          
          const aEpoch = (new Date(a.lastModified)).getTime();
          const bEpoch = (new Date(b.lastModified)).getTime();

          return aEpoch - bEpoch;
        })

        const dataReversed = Object.values(transformedFetchedData).reverse()

        setNotes(dataReversed);

      }else{
        setNotes(null);
      }
    })
   }, [token, userId])

  useEffect(() => {
      fetchNotes();
  }, [fetchNotes])


  const addNoteHandler = (note) => {
    axios.post('https://notes-app-bfc11-default-rtdb.firebaseio.com/notes.json?auth=' + token , note)
    .then(response => {
      if (response) {
        fetchNotes();
        setActive(!active);
      }
    })
    .catch(err => console.log(err));
  }

  const deleteNoteHandler = (note) =>  { 
    axios.delete('https://notes-app-bfc11-default-rtdb.firebaseio.com/notes/' + note + '.json?auth=' + token)
    .then(res => {
      if (res) {
        fetchNotes();
        setEditNote(null);
      }
    })
    .catch(err => console.log(err));
  }

  const editNoteHandler = (note) => {
    axios.get('https://notes-app-bfc11-default-rtdb.firebaseio.com/notes/' + note + '.json?auth=' + token)
    .then(res => {
      const editingNote = {
        title: res.data.title,
        body: res.data.body,
        name: note
      }
      setEditNote(editingNote);
      setActive(!active);
    }).catch(err => console.log(err))
  }

  const updateNoteHandler = (note) => {
    axios.patch('https://notes-app-bfc11-default-rtdb.firebaseio.com/notes/' + editNote.name + '.json?auth=' + token, note)
    .then(res => {
      if (res) {
        fetchNotes();
        setEditNote(null);
        setActive(!active);
      }
    }).catch(err => console.log(err))
  }

  return (
    <Fragment>
        <Box mt={5} >
          <Container maxWidth="lg">
            <Box >
            <Grid 
            container 
            justify="center"
            >
              <Grid item xs={12} sm={12} md={10} lg={5} xl={5}>
                {!isMobile || active ?
                 <Sidebar 
                 user={user} 
                 notes={notes} 
                 onDeleteNote={deleteNoteHandler}
                 onEditNote={editNoteHandler}/> 
                 : 
                 <Box mt='15px' textAlign="left">
                        <IconButton 
                        onClick={() => {
                          setEditNote(null);
                          setActive(!active);
                        }}
                        color="primary"
                        >
                          <ArrowBackIcon fontSize="large"/>
                        </IconButton>
                 </Box>
                }
              </Grid>
                {!isMobile || !active ? 
                <Grid item xs={12}  sm={12} md={10} lg={7} xl={7}> 
                  <Main 
                  onAddNote={addNoteHandler} 
                  editNote={editNote} notes={notes} 
                  onUpdateNote={updateNoteHandler}/>   
                </Grid> 
                : 
                <Box position="fixed" zIndex="1" bottom={15} right={15}>
                  <Grid item>
                    <IconButton 
                    onClick={() => setActive(!active)}
                    >
                      <AddCircleIcon color="secondary" style={{fontSize: '3em', opacity: '0.7'}}/>
                    </IconButton>
                  </Grid>
                </Box>
                }
            
            </Grid>
            </Box>
          </Container>
        </Box>
    </Fragment>
  )
}

export default NotesApp;