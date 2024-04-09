// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

// assets
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

// types
import { Column } from '@tanstack/react-table';

enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

const SortToggler = ({ type }: { type?: SortType }) => {
  const theme = useTheme();
  return (
    <Stack sx={{ color: 'secondary.light' }}>
      <CaretUpOutlined
        style={{
          fontSize: '0.625rem',
          color: type === SortType.ASC ? theme.palette.text.secondary : 'inherit'
        }}
      />
      <CaretDownOutlined
        style={{
          fontSize: '0.625rem',
          marginTop: -2,
          color: type === SortType.DESC ? theme.palette.text.secondary : 'inherit'
        }}
      />
    </Stack>
  );
};

interface HeaderSortProps {
  column: Column<any, unknown>;
  sort?: boolean;
}

// ==============================|| SORT HEADER ||============================== //

const HeaderSort = ({ column, sort }: HeaderSortProps) => {
  return (
    <Box {...(sort && { onClick: column.getToggleSortingHandler(), className: 'cursor-pointer prevent-select' })}>
      {{
        asc: <SortToggler type={SortType.ASC} />,
        desc: <SortToggler type={SortType.DESC} />
      }[column.getIsSorted() as string] ?? <SortToggler />}
    </Box>
  );
};

export default HeaderSort;
