// material-ui
import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
// ==============================|| SOURCES PAGE ||============================== //

interface Source {
  ID: number;
  Name: string;
  MultiCastAddress: number;
  Port: string;
}

const SourcesPage = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const [selectedSource, setSelectedSource] = useState<Source | null>();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [SourceName, setSourceName] = useState("")
  const [Port, setPort] = useState("")
  const [MultiCastAddress, setMultiCastAddress] = useState("")

  async function checkAdmin() {
      const response = await fetch('http://localhost:3001/isAdmin', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        setIsAdmin(true)
      }
      else {
        setIsAdmin(false)
      }
    
    
  }

  const handleEditClick = (source: Source) => {
    setSelectedSource(source);
    setOpenEditDialog(true);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteClick = async (source: Source) => {
    try {
      const response = await fetch('http://localhost:3001/deletesource', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          Name: SourceName,
          Port: Port,
          MultiCastAddress: MultiCastAddress,
          ID: source.ID,
         }),
      });

      if (!response.ok) {
          alert('מחיקת הפריט לא צלחה :(');
          throw new Error(`Error! status: ${response.status}`);
        
      }
      else {
      
          alert('הפריט נמחק!');
          window.location.reload();
      }

      const result = await response.json();
    } 
    catch(error)
    {
    }
  
  setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
        const response = await fetch('http://localhost:3001/addSource', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            Name: SourceName,
            Port: Port,
            MultiCastAddress: MultiCastAddress,
           }),
        });
  
        if (!response.ok) {
            alert('שמירת הפריט לא צלחה :(');

          throw new Error(`Error! status: ${response.status}`);
          
        }
        else {
            alert('הפריט נשמר!');
            window.location.reload();


        }
  
        const result = await response.json();
      } 
      catch(error)
      {
      }
    
    setOpenDialog(false);
  };

  const handleEdit = async (source: Source) => {
    try {
        const response = await fetch('http://localhost:3001/editsource', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              Name: SourceName,
              Port: Port,
              MultiCastAddress: MultiCastAddress,
              ID: source.ID,
           }),
        });
  
        if (!response.ok) {
            alert('עדכון הפריט לא צלחה :(');

          throw new Error(`Error! status: ${response.status}`);
          
        }
        else {
            alert('הפריט עודכן!');
            window.location.reload();

        }
  
        const result = await response.json();
      } 
      catch(error)
      {
      }
    
    setOpenDialog(false);
  };

  const navigate = useNavigate();

  const handlePlay = (source : String) => {
    navigate("play?source="+source)
  }

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('http://localhost:3001/getSources', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const responseBody = await response.text();
          const jsonItems = JSON.parse(responseBody.toString());
          setSources(jsonItems.sources);
          checkAdmin();
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '0rem', paddingRight:"0rem"}} dir='ltr'>

    {sources
      .map((source, index) => (
        <Card key={index} style={{ margin: '1rem', padding: '1rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', borderRadius: '4px', height:"20rem", width:"18rem", justifyContent:"center"}}>
         
          <CardContent style={{justifyItems:"center"}}>

            <CardMedia component="img" alt={source.Name} style={{ height: '7rem', justifyItems:"center"}}/>

            <CardContent style={{ flexGrow: 1}}>
              <Typography variant="body1">{source.Name}</Typography>
              <Typography variant="body2"  fontWeight={'bold'}>
                Multicast: {source.MultiCastAddress}
              </Typography>
              <Typography variant="body2"  fontWeight={'bold'}>
                Port: {source.Port} 
              </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => handlePlay(source.Name)}>
                <PlayCircleIcon style={{color:"black"}}/>
                </Button>

              {isAdmin == true &&
                <Button size="small" color="primary"  onClick={() => {handleEditClick(source)}}>
                  <EditIcon style={{color:"black"}}/>
                </Button>
              
              }
              {isAdmin == true &&
                <Button size="small" color="primary"  onClick={() => {handleDeleteClick(source)}}>
                  <DeleteIcon style={{color:"black"}}/>
                </Button>
              
              }
               
          </CardActions>
          </CardContent>
          
        </Card>
      ))}

<Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Source</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the Source.
          </DialogContentText>
          <TextField
            label={"Current MulticastAddress: "+selectedSource?.MultiCastAddress}
            onChange={e => setMultiCastAddress(e.target.value)}   
         
            fullWidth
            margin="normal"
          />
          <TextField
            label={"Current Name: "+selectedSource?.Name}
            onChange={e => setSourceName(e.target.value)}            

            fullWidth
            margin="normal"
          />
          <TextField
            label={"Current Port: "+selectedSource?.Port}
            onChange={e => setPort(e.target.value)}            
            fullWidth
            margin="normal"
          />

        <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button  onClick={() => {
                if (selectedSource) 
                {
                  handleEdit(selectedSource);
                }
          }} color="primary">
            Save
          </Button>
        </DialogContent>
        
      </Dialog>
  </div>
    )
  }

export default SourcesPage;
