// material-ui
import { useTheme } from '@mui/material/styles';
import { Tooltip } from '@mui/material';

// third-party
import { CSVLink } from 'react-csv';

// assets
import { DownloadOutlined } from '@ant-design/icons';
import { Headers } from 'react-csv/lib/core';

// ==============================|| CSV EXPORT ||============================== //

interface CSVExportProps {
  data: never[] | any[];
  filename: string;
  headers?: Headers;
}

const CSVExport = ({ data, filename, headers }: CSVExportProps) => {
  const theme = useTheme();

  return (
    <CSVLink data={data} filename={filename} headers={headers}>
      <Tooltip title="CSV Export">
        <DownloadOutlined style={{ fontSize: '24px', color: theme.palette.text.secondary, marginTop: 4, marginRight: 4, marginLeft: 4 }} />
      </Tooltip>
    </CSVLink>
  );
};

export default CSVExport;
