// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// ==============================|| SOURCES PAGE ||============================== //

interface Source {
  ID: number;
  Name: string;
  MultiCastAddress: number;
  Port: string;
}

const SourcesManage = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedSource, setSelectedSource] = useState<Source | null>();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [SourceName, setSourceName] = useState("")
  const [Port, setPort] = useState("")
  const [MultiCastAddress, setMultiCastAddress] = useState("")

  const handleEditClick = (source: Source) => {
    setSelectedSource(source);
    setOpenEditDialog(true);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteClick = async (source: Source) => {
    try {
      const response = await fetch('http://localhost:3002/deleteItem', {
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
        const response = await fetch('http://localhost:3001/EditSource', {
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
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);
  
  return (
  <MainCard title="Video Sources">
    <div style={{paddingTop:"4rem"}}>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source ID</TableCell>
              <TableCell>Source Name</TableCell>
              <TableCell>MultiCast Address</TableCell>
              <TableCell>Port</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((item, index) => (
              <TableRow key={item.ID}>
                <TableCell>{item.ID}</TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.MultiCastAddress}</TableCell>
                <TableCell>{item.Port}</TableCell>
                <TableCell>
                  Buttons
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Item</DialogTitle>
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
            label="Port"
            onChange={e => setPort(e.target.value)}            
            
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="MultiCast Address"
            onChange={e => setMultiCastAddress(e.target.value)}            
    
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
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the item.
          </DialogContentText>
          <TextField
            label={"Current Name: "+selectedSource?.Name}
            onChange={e => setSourceName(e.target.value)}   
         
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
          <TextField
            label={"Current MultiCast Address: "+selectedSource?.MultiCastAddress}
            onChange={e => setMultiCastAddress(e.target.value)}            
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
  </MainCard>
  )
  }

export default SourcesManage;
