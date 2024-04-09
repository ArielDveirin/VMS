import { ChangeEvent, KeyboardEvent, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, TextField } from '@mui/material';

// project imports
import { addStoryComment } from 'api/kanban';
import { openSnackbar } from 'api/snackbar';

// third-party
import { Chance } from 'chance';

// assets
import { AppstoreOutlined, FileAddOutlined, VideoCameraAddOutlined } from '@ant-design/icons';

// types
import { SnackbarProps } from 'types/snackbar';
import { KanbanComment } from 'types/kanban';
import IconButton from 'components/@extended/IconButton';

interface Props {
  storyId: string;
}

const chance = new Chance();

// ==============================|| KANBAN BACKLOGS - ADD STORY COMMENT ||============================== //

const AddStoryComment = ({ storyId }: Props) => {
  const theme = useTheme();

  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);

  const handleAddStoryComment = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      addNewStoryComment();
    }
  };

  const addNewStoryComment = () => {
    if (comment.length > 0) {
      const newComment: KanbanComment = {
        id: `${chance.integer({ min: 1000, max: 9999 })}`,
        comment,
        profileId: 'profile-3'
      };

      addStoryComment(storyId, newComment);
      openSnackbar({
        open: true,
        message: 'Comment Added successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      setComment('');
    } else {
      setIsComment(true);
    }
  };

  const handleStoryComment = (event: ChangeEvent<HTMLInputElement>) => {
    const newComment = event.target.value;
    setComment(newComment);
    if (newComment.length <= 0) {
      setIsComment(true);
    } else {
      setIsComment(false);
    }
  };

  return (
    <Box sx={{ p: 2, pb: 1.5, border: `1px solid ${theme.palette.divider}` }}>
      <Grid container alignItems="center" spacing={0.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Add Comment"
            value={comment}
            onChange={handleStoryComment}
            sx={{
              mb: 3,
              '& input': { bgcolor: 'transparent', p: 0, borderRadius: '0px' },
              '& fieldset': { display: 'none' },
              '& .MuiFormHelperText-root': {
                ml: 0
              },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'transparent',
                '&.Mui-focused': {
                  boxShadow: 'none'
                }
              }
            }}
            onKeyUp={handleAddStoryComment}
            helperText={isComment ? 'Comment is required.' : ''}
            error={isComment}
          />
        </Grid>
        <Grid item>
          <IconButton>
            <VideoCameraAddOutlined />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <FileAddOutlined />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <AppstoreOutlined />
          </IconButton>
        </Grid>
        <Grid item xs zeroMinWidth />
        <Grid item>
          <Button size="small" variant="contained" color="primary" onClick={addNewStoryComment}>
            Comment
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddStoryComment;
