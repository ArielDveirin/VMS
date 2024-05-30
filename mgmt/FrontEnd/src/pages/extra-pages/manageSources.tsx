import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Source {
    ID: number;
    Name: string;
    MultiCastAddress: number;
    Port: string;
}



const SourcePanel = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [selectedSource, setSelectedSource] = useState<Source | null>();

  const [SourceID, setSourceID] = useState("")
  const [Name, setSourceName] = useState("")
  const [MulticastAddress, setMulticastAddress] = useState("")
  const [Port, setPort] = useState("")

  const [isAdmin, setIsAdmin] = useState(false);
  const [err, setErr] = useState('');


  async function checkAdmin() {
    try {
      const response = await fetch('http://localhost:3001/isAdmin', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        setIsAdmin(true)

      }
    } 
    catch(error)
    {
        setErr('Error');
    }
  }
  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:3001/getSources', {
            method: 'GET',
            credentials: 'include',
          });
  
          if (response.ok) {
            const responseBody = await response.text(); // Get the response text
            
            const jsonItems = JSON.parse((responseBody.toString()));
            setSources(jsonItems.sources);
            
          } else {
            // Handle the case where the API request is not successful
          }
        } catch (error) {
          // Handle any other errors that may occur during the API request
        }
      }
    )();
  }, []);

  // const data = await response.json();
  //setItems(data);
  const handleEditClick = (source: Source) => {
    setSelectedSource(source);
    setOpenEditDialog(true);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteClick = async (source: Source) => {
    try {
      const response = await fetch('http://localhost:3001/deleteSource', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            Name: source.Name,
            Port: source.Port,
            MulticastAddress: source.MultiCastAddress,
            SourceID: source.ID,
         }),
      });

      if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        
      }
      else {
      
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
        const response = await fetch('http://localhost:3001/addsource', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            Name: Name,
            Port: Port,
            MulticastAddress: MulticastAddress,
           }),
        });
  
        if (!response.ok) {

          throw new Error(`Error! status: ${response.status}`);
          
        }
        else {
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
        const response = await fetch('http://localhost:3001/EditSource', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            Name: source.Name,
            Port: source.Port,
            MulticastAddress: source.MultiCastAddress,
            SourceID: source.ID,
           }),
        });
  
        if (!response.ok) {

          throw new Error(`Error! status: ${response.status}`);
          
        }
        else {
            window.location.reload();

        }
  
        const result = await response.json();
      } 
      catch(error)
      {
      }
    
    setOpenDialog(false);
  };

  checkAdmin();


  if (isAdmin)
  {
  return (
    <div style={{paddingTop:"4rem"}}>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Source
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source ID</TableCell>
              <TableCell>Source Name</TableCell>
              <TableCell>Multicast Address</TableCell>
              <TableCell>Port</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source, index) => (
              <TableRow key={source.ID}>
                <TableCell>{source.ID}</TableCell>
                <TableCell>{source.Name}</TableCell>
                <TableCell>{source.MultiCastAddress}</TableCell>
                <TableCell>{source.Port}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {handleEditClick(source)}}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {handleDeleteClick(source)}}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Source</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the Source.
          </DialogContentText>
          <TextField
            label="Source Name"
            onChange={e => setSourceName(e.target.value)}            
            fullWidth
            margin="normal"
          />
          <TextField
            label="MultiCast Address"
            onChange={e => setMulticastAddress(e.target.value)}            
            
            fullWidth
            margin="normal"
          />
          <TextField
            label="Port"
            onChange={e => setPort(e.target.value)}            
    
            type="number"
            fullWidth
            margin="normal"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Source</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the Source.
          </DialogContentText>
          <TextField
            label={"Current Name: "+ selectedSource?.Name}
            onChange={e => setSourceName(e.target.value)}   
         
            fullWidth
            margin="normal"
          />
          <TextField
            label={"Current Multicast Address: "+selectedSource?.MultiCastAddress}
            onChange={e => setMulticastAddress(e.target.value)}            

            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label={"Current Port: "+selectedSource?.Port}
            onChange={e => setPort(e.target.value)}            
            type="number"
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
  );
            }
            else {
              return (
                <div>
                    {isAdmin ? 'Hi Admin User' : 'You are not Admin'}
                </div>
            );
            }
};

export default SourcePanel;