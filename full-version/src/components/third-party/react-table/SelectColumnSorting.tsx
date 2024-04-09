// material-ui
import { Checkbox, FormControl, InputBaseProps, ListItemText, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

// third-party
import { Column, SortingState, TableState } from '@tanstack/react-table';
import { SetStateAction } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200
    }
  }
};

interface Props {
  getState: () => TableState;
  setSorting: (value: SetStateAction<SortingState>) => void;
  getAllColumns: () => Column<any, unknown>[];
  size?: InputBaseProps['size'];
}

// ==============================|| COLUMN SORTING - SELECT ||============================== //

const SelectColumnSorting = ({ getState, getAllColumns, setSorting, size = 'medium' }: Props) => (
  <FormControl sx={{ width: 200 }}>
    <Select
      id="column-sorting"
      multiple
      displayEmpty
      value={getState().sorting.length > 0 ? getState().sorting : []}
      input={<OutlinedInput id="select-column-sorting" placeholder="select column" />}
      renderValue={(selected) => {
        const selectedColumn = getAllColumns().filter((column) => selected.length > 0 && column.id === selected[0].id)[0];
        if (selectedColumn) {
          return (
            <Typography variant="subtitle2">
              Sort by ({typeof selectedColumn.columnDef.header === 'string' ? selectedColumn.columnDef.header : '#'})
            </Typography>
          );
        }
        return <Typography variant="subtitle2">Sort By</Typography>;
      }}
      MenuProps={MenuProps}
      size={size}
    >
      {getAllColumns().map(
        (column) =>
          // @ts-ignore
          column.columnDef.accessorKey &&
          column.getCanSort() && (
            <MenuItem
              key={column.id}
              value={column.id}
              onClick={() =>
                setSorting(getState().sorting.length > 0 && column.id === getState().sorting[0].id ? [] : [{ id: column.id, desc: false }])
              }
            >
              <Checkbox checked={getState().sorting.length > 0 && column.id === getState().sorting[0].id} color="success" />
              <ListItemText primary={column.columnDef.header as string} />
            </MenuItem>
          )
      )}
    </Select>
  </FormControl>
);

export default SelectColumnSorting;
