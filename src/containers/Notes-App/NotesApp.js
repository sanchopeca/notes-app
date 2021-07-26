import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';


import {Grid, Container, Box, IconButton, useMediaQuery} from '@material-ui/core';
import Sidebar from '../../components/Notes/Sidebar/Sidebar';
import Main from '../../components/Notes/Main/Main';
import AuthContext from '../../store/AuthContext';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import { Typography } from '@material-ui/core';



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
          console.log(b.lastModified)
          
          const aEpoch = (new Date(a.lastModified)).getTime();
          const bEpoch = (new Date(b.lastModified)).getTime();
          console.log(aEpoch, bEpoch, ' - sort');

          return aEpoch - bEpoch;
        })

        const dataReversed = Object.values(transformedFetchedData).reverse()

        setNotes(dataReversed);
        
     
        console.log(res.data, 'res-data');
        console.log(fetchedNotes, 'fetchedNotes')
        console.log(transformedNotes, '9');
        console.log(transformedFetchedData, '29');
        console.log(dataReversed, '329');
      }else{
        setNotes(null);
        console.log(res.data, 'res-data');
        console.log(notes, '29');
        console.log(editNote, 'deletedEditNote')
      }
    })
   }, [])

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
      console.log(editNote, 'res2')
    }).catch(err => console.log(err))
    console.log(note, 'eee');
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