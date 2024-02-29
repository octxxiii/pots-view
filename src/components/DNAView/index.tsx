import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const advancedTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#512DA8", // Deep purple
    },
    secondary: {
      main: "#C2185B", // Deep pink
    },
    background: {
      default: "#212121", // Dark grey
      paper: "#333", // Darker grey
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#C2185B", // Deep pink (secondary text)
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif', // Roboto font
    h4: {
      fontWeight: 500,
      color: "#fff", // Deep purple (header color)
    },
  },
});

type RowData = {
  id: string;
  hash: string;
  fileName: string;
  groupName: string;
  extraInfo: string;
};

const createData = (
  id: string,
  hash: string,
  fileName: string,
  groupName: string,
  extraInfo: string
): RowData => {
  return { id, hash, fileName, groupName, extraInfo };
};

const rows: RowData[] = Array.from({ length: 12 }, (_, index) =>
  createData(
    `${index + 1}`,
    `hash${index + 1}`,
    `file${index + 1}.exe`,
    `Group ${String.fromCharCode(65 + (index % 26))}`,
    "N/A"
  )
);

type DnaViewProps = {
  isOpen: boolean;
};

function DnaView({ isOpen }: DnaViewProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <ThemeProvider theme={advancedTheme}>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            악성코드 DNA 분석 결과 시각화
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selected.length === rows.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>분석요청ID</TableCell>
                  <TableCell>해시</TableCell>
                  <TableCell>파일명</TableCell>
                  <TableCell>그룹 명칭</TableCell>
                  <TableCell>추가 정보</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = selected.indexOf(row.id) !== -1;
                    return (
                      <TableRow
                        key={row.id}
                        selected={isItemSelected}
                        onClick={() => handleClick(row.id)}
                        hover
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.hash}</TableCell>
                        <TableCell>{row.fileName}</TableCell>
                        <TableCell>{row.groupName}</TableCell>
                        <TableCell>{row.extraInfo}</TableCell>
                        <TableCell align="right">
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default DnaView;
