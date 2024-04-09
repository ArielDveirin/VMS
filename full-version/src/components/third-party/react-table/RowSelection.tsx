// material-ui
import { Chip } from '@mui/material';

// ==============================|| ROW SELECTION - PREVIEW ||============================== //

const RowSelection = ({ selected }: { selected: number }) => (
  <>
    {selected > 0 && (
      <Chip
        size="small"
        label={`${selected} row(s) selected`}
        color="secondary"
        variant="light"
        sx={{
          position: 'absolute',
          right: -1,
          top: -1,
          borderRadius: '0 4px 0 4px'
        }}
      />
    )}
  </>
);

export default RowSelection;
