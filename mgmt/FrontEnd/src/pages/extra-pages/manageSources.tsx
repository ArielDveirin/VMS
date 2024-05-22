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

interface Item {
  ID?: number;
  Name: string;
  Price: string;
  Quantity: string;
  ImageUrl: string;
}



const ItemPanel = (props: {searchWord: string}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Item | null>();

  const [ItemName, setItemName] = useState("")
  const [ImageUrl, setImageUrl] = useState("")
  const [Price, setPrice] = useState("")
  const [Quantity, setQuantity] = useState("")

  const [isAdmin, setIsAdmin] = useState(false);
  const [err, setErr] = useState('');


  async function checkAdmin() {
    try {
      const response = await fetch('http://localhost:3002/isAdmin', {
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
          const response = await fetch('http://localhost:3002/getItems', {
            method: 'GET',
            credentials: 'include',
          });
  
          if (response.ok) {
            const responseBody = await response.text(); // Get the response text
            
            const jsonItems = JSON.parse((responseBody.toString()));

            setItems(jsonItems.items);
            
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
  const handleEditClick = (item: Item) => {
    setSelectedItem(item);
    setOpenEditDialog(true);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteClick = async (item: Item) => {
    try {
      const response = await fetch('http://localhost:3002/deleteItem', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            Name: item.Name,
            Quantity: item.Quantity,
            Price: item.Price,
            Item_Id: item.ID,
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
        const response = await fetch('http://localhost:3002/addItem', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              Name: ItemName,
              Quantity: Quantity,
              Price: Price,
              ImageUrl: ImageUrl
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

  const handleEdit = async (item: Item) => {
    try {
        const response = await fetch('http://localhost:3002/EditItem', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              Name: ItemName,
              Quantity: Quantity,
              Price: Price,
              ID: item.ID,
              ImageUrl: ImageUrl
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

  checkAdmin();


  if (isAdmin)
  {
  return (
    <div style={{paddingTop:"4rem"}}>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Item
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Amount in Stock</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.filter(item =>  item.Name.includes(props.searchWord)).map((item, index) => (
              <TableRow key={item.ID}>
                <TableCell>{item.ID}</TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Price}</TableCell>
                <TableCell>{item.Quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {handleEditClick(item)}}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {handleDeleteClick(item)}}
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
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the item.
          </DialogContentText>
          <TextField
            label="Item Name"
            onChange={e => setItemName(e.target.value)}            
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            onChange={e => setPrice(e.target.value)}            
            
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount in Stock"
            onChange={e => setQuantity(e.target.value)}            
    
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="ImageUrl"
            onChange={e => setImageUrl(e.target.value)}            
    
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
            label={"Current Name: "+selectedItem?.Name}
            onChange={e => setItemName(e.target.value)}   
         
            fullWidth
            margin="normal"
          />
          <TextField
            label={"Current Price: "+selectedItem?.Price}
            onChange={e => setPrice(e.target.value)}            

            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label={"Current Quantity: "+selectedItem?.Quantity}
            onChange={e => setQuantity(e.target.value)}            
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="ImageUrl"
            onChange={e => setImageUrl(e.target.value)}            
    
            fullWidth
            margin="normal"
          />

        <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button  onClick={() => {
                if (selectedItem) 
                {
                  handleEdit(selectedItem);
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

export default ItemPanel;