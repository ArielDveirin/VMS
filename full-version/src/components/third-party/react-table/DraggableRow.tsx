import { FC, ReactElement } from 'react';

// material-ui
import { TableCell, TableRow } from '@mui/material';

// third-party
import { useDrag, useDrop } from 'react-dnd';
import { Row } from '@tanstack/react-table';

// project-import
import IconButton from 'components/@extended/IconButton';

// assets
import { DragOutlined } from '@ant-design/icons';

// types
import { TableDataProps } from 'types/table';

// ==============================|| DRAGGABLE ROW ||============================== //

const DraggableRow: FC<{
  row: Row<TableDataProps>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
  children: ReactElement;
}> = ({ row, reorderRow, children }) => {
  const [{ isOverCurrent }, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<TableDataProps>) => reorderRow(draggedRow.index, row.index),
    collect: (monitor) => ({ isOver: monitor.isOver(), isOverCurrent: monitor.isOver({ shallow: true }) })
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => row,
    type: 'row'
  });

  return (
    <TableRow
      ref={previewRef} //previewRef could go here
      sx={{ opacity: isDragging ? 0.5 : 1, bgcolor: isOverCurrent ? 'primary.lighter' : 'inherit' }}
    >
      <TableCell ref={dropRef}>
        <IconButton
          ref={dragRef}
          size="small"
          sx={{ p: 0, width: 24, height: 24, fontSize: '1rem', mr: 0.75 }}
          color="secondary"
          disabled={row.getIsGrouped()}
        >
          <DragOutlined />
        </IconButton>
      </TableCell>
      {children}
    </TableRow>
  );
};

export default DraggableRow;
