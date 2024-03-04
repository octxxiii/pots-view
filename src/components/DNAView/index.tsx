import React, { useState, useEffect, useRef } from "react";
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
  TextField,
  TableSortLabel,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";

const advancedTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff", // Deep purple
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
      secondary: "#fff", // Deep pink (secondary text)
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif', // Roboto font
    h4: {
      fontWeight: 500,
      color: "#fff", // Deep purple (header color)
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            height: "40px", // Set height of selected (editing) rows
          },
        },
      },
    },
  },
});

type RowData = {
  id: string;
  hash: string;
  fileName: string;
  groupName: string;
  extraInfo: string;
  [key: string]: string; // 이미 추가된 인덱스 시그니처
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
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [rowData, setRowData] = useState<RowData[]>(rows);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string>("");
  const [editingHash, setEditingHash] = useState<string | null>(null);
  const [editHash, setEditHash] = useState<string>("");
  const [editingFileName, setEditingFileName] = useState<string | null>(null);
  const [editFileName, setEditFileName] = useState<string>("");
  const [editingGroupName, setEditingGroupName] = useState<string | null>(null);
  const [editGroupName, setEditGroupName] = useState<string>("");
  const [editingExtraInfo, setEditingExtraInfo] = useState<string | null>(null);
  const [editExtraInfo, setEditExtraInfo] = useState<string>("");
  const [tableRows, setTableRows] = useState<RowData[]>(rows);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // 편집 모드인 경우 첫 번째 입력 필드에 포커스를 맞춥니다.
    // 여기서는 editInputRef.current가 HTMLInputElement인지 확인합니다.
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function naturalSort(
    a: RowData,
    b: RowData,
    orderBy: keyof RowData,
    direction: "asc" | "desc"
  ): number {
    // 문자열과 숫자를 분리하는 함수
    const extractParts = (str: string) => {
      // 입력 값이 유효하지 않은 경우 기본값으로 빈 문자열을 사용합니다.
      str = str ?? "";
      const match = str.match(/^(\D*)(\d*)/); // 문자열 시작부의 문자와 숫자를 분리
      return {
        chars: match ? match[1] : "", // 분리된 문자열 부분
        num: match && match[2] ? parseInt(match[2], 10) : 0, // 분리된 숫자 부분
      };
    };

    const aParts = extractParts(a[orderBy] as string);
    const bParts = extractParts(b[orderBy] as string);

    // 먼저 문자열 부분을 비교
    if (aParts.chars.toLowerCase() < bParts.chars.toLowerCase())
      return direction === "asc" ? -1 : 1;
    if (aParts.chars.toLowerCase() > bParts.chars.toLowerCase())
      return direction === "asc" ? 1 : -1;

    // 문자열 부분이 같은 경우 숫자 부분을 비교
    if (aParts.num < bParts.num) return direction === "asc" ? -1 : 1;
    if (aParts.num > bParts.num) return direction === "asc" ? 1 : -1;

    return 0; // 모두 같은 경우
  }

  const sortArray = (array: RowData[]): RowData[] => {
    return array.sort((a, b) => naturalSort(a, b, orderBy, orderDirection));
  };

  const sortedRows = sortArray([...rowData]);

  const handleSaveClick = (rowId: string) => {
    // 수정된 값을 상태로 업데이트
    const updatedRows = rowData.map((row) =>
      row.id === rowId
        ? {
            ...row,
            id: editId,
            hash: editHash,
            fileName: editFileName,
            groupName: editGroupName,
            extraInfo: editExtraInfo,
          }
        : row
    );
    setRowData(updatedRows);

    // Clear editing state
    clearEditingState();
  };

  // 편집 상태를 초기화하는 함수를 추가합니다.
  const clearEditingState = () => {
    setEditingRow(null);
    setEditingId(null);
    setEditId("");
    setEditingHash(null);
    setEditHash("");
    setEditingFileName(null);
    setEditFileName("");
    setEditingGroupName(null);
    setEditGroupName("");
    setEditingExtraInfo(null);
    setEditExtraInfo("");
  };

  const handleEditClick = (id: string) => {
    // Editing 상태로 변경되었을 때 해당 행의 값을 초기값으로 설정
    const row = rowData.find((row) => row.id === id);
    if (row) {
      setEditingId(id);
      setEditId(row.id);
      setEditingHash(id);
      setEditHash(row.hash);
      setEditingFileName(id);
      setEditFileName(row.fileName);
      setEditingGroupName(id);
      setEditGroupName(row.groupName);
      setEditingExtraInfo(id);
      setEditExtraInfo(row.extraInfo);
    }
  };

  const handleAddRow = () => {
    const newRowId = editingId ? `${parseInt(editingId, 10) + 1}` : ""; // editingId가 null이 아닐 때만 처리

    // 입력값을 받는 순서를 변경하고, 편집 중인 행을 새로운 행으로 설정합니다.
    setEditingId(newRowId);

    const newRow = createData(
      newRowId, // 분석 요청 ID를 자동으로 설정합니다.
      "new-hash",
      "new-file.exe",
      "New Group",
      "N/A"
    );

    // rowData 상태 업데이트
    const updatedRows = [...rowData, newRow];
    setRowData(updatedRows);

    // 새로운 행이 위치할 페이지 계산
    const newPageIndex = Math.floor(updatedRows.length / rowsPerPage);
    setPage(newPageIndex);

    // 수정 상태로 전환하고 입력 필드에 포커스를 맞춥니다.
    setEditingId(newRowId);
  };

  useEffect(() => {
    // 편집 모드인 경우 입력 필드에 포커스를 맞춤. 페이지 로드 완료 후 실행되도록 설정
    if (editingId && editInputRef.current) {
      setTimeout(() => {
        // setTimeout 내부에서 다시 한번 확인
        if (editInputRef.current) {
          editInputRef.current.focus();
        }
      }, 100);
    }
  }, [editingId, page]); // 페이지 변경 시에도 실행되도록 page 의존성 추가

  const saveDataToLocal = (data: RowData[]) => {
    // 로컬 저장소에 데이터 저장
    localStorage.setItem("rowData", JSON.stringify(data));
  };

  const handleDeleteClick = (id: string) => {
    const updatedRows = rowData.filter((row) => row.id !== id);
    setRowData(updatedRows);
    saveDataToLocal(updatedRows); // 로컬 저장소에 저장
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rowData.map((n) => n.id);
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
        <Box my={3} style={{ maxHeight: "51vh", overflow: "auto" }}>
          <Typography variant="h4" gutterBottom>
            악성코드 DNA 분석 결과 시각화
          </Typography>
          <Box my={0}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddRow}
              style={{ float: "right", marginBottom: "10px" }}
            >
              분석 요청 추가
            </Button>
          </Box>
          <TableContainer component={Paper} style={{ minHeight: "33.3vh" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="tableHeader"
                    style={{ flex: "0 0 5%" }}
                    padding="checkbox"
                  >
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selected.length === rows.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                  <TableCell className="tableHeader" style={{ width: "150px" }}>
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? orderDirection : "asc"}
                      onClick={() => handleRequestSort("id")}
                    >
                      분석요청ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="tableHeader" style={{ width: "150px" }}>
                    <TableSortLabel
                      active={orderBy === "hash"}
                      direction={orderBy === "hash" ? orderDirection : "asc"}
                      onClick={() => handleRequestSort("hash")}
                    >
                      해시
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="tableHeader" style={{ width: "150px" }}>
                    <TableSortLabel
                      active={orderBy === "fileName"}
                      direction={
                        orderBy === "fileName" ? orderDirection : "asc"
                      }
                      onClick={() => handleRequestSort("fileName")}
                    >
                      파일명
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="tableHeader" style={{ width: "150px" }}>
                    <TableSortLabel
                      active={orderBy === "groupName"}
                      direction={
                        orderBy === "groupName" ? orderDirection : "asc"
                      }
                      onClick={() => handleRequestSort("groupName")}
                    >
                      그룹 명칭
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="tableHeader" style={{ width: "150px" }}>
                    <TableSortLabel
                      active={orderBy === "extraInfo"}
                      direction={
                        orderBy === "extraInfo" ? orderDirection : "asc"
                      }
                      onClick={() => handleRequestSort("extraInfo")}
                    >
                      추가 정보
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    className="tableHeader"
                    style={{ flex: "0 0 25%" }} // Actions의 너비를 늘림
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows
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
                        <TableCell
                          className="tableHeader"
                          style={{ width: "150px" }}
                          padding="checkbox"
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          className="tableHeader"
                          style={{ width: "150px" }}
                        >
                          {editingId === row.id ? (
                            <TextField
                              id={`id-${row.id}`}
                              value={editId}
                              onChange={(e) => setEditId(e.target.value)}
                              fullWidth
                              size="small"
                              autoFocus // 분석 요청 ID 입력칸에 포커스를 맞춥니다.
                            />
                          ) : (
                            row.id
                          )}
                        </TableCell>
                        <TableCell
                          className="tableHeader"
                          style={{ width: "150px" }}
                        >
                          {editingHash === row.id ? (
                            <TextField
                              id={`hash-${row.id}`}
                              value={editHash}
                              onChange={(e) => setEditHash(e.target.value)}
                              fullWidth
                              size="small"
                              autoFocus // 해시 입력칸에 포커스를 맞춥니다.
                            />
                          ) : (
                            row.hash
                          )}
                        </TableCell>
                        <TableCell
                          className="tableHeader"
                          style={{ width: "150px" }}
                        >
                          {editingFileName === row.id ? (
                            <TextField
                              id={`filename-${row.id}`}
                              value={editFileName}
                              onChange={(e) => setEditFileName(e.target.value)}
                              fullWidth
                              size="small"
                            />
                          ) : (
                            row.fileName
                          )}
                        </TableCell>
                        <TableCell
                          className="tableHeader"
                          style={{ width: "150px" }}
                        >
                          {editingGroupName === row.id ? (
                            <TextField
                              id={`groupname-${row.id}`}
                              value={editGroupName}
                              onChange={(e) => setEditGroupName(e.target.value)}
                              fullWidth
                              size="small"
                            />
                          ) : (
                            row.groupName
                          )}
                        </TableCell>
                        <TableCell
                          className="tableHeader"
                          style={{ width: "150px" }}
                        >
                          {editingExtraInfo === row.id ? (
                            <TextField
                              id={`extrainfo-${row.id}`}
                              value={editExtraInfo}
                              onChange={(e) => setEditExtraInfo(e.target.value)}
                              fullWidth
                              size="small"
                            />
                          ) : (
                            row.extraInfo
                          )}
                        </TableCell>
                        <TableCell
                          className="tableHeader"
                          style={{ width: "150px" }}
                          align="right"
                        >
                          {editingId === row.id ? (
                            <IconButton onClick={() => handleSaveClick(row.id)}>
                              <SaveIcon />
                            </IconButton>
                          ) : (
                            <>
                              <IconButton
                                onClick={() => handleEditClick(row.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteClick(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5]} // Rows per page 설정 옵션을 5로 설정
            count={rowData.length} // 전체 행 수
            rowsPerPage={5} // 현재 페이지당 행 수를 5로 고정
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            API 분석 결과
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell className="tableHeader" style={{ width: "150px" }}>
                    분석요청ID
                  </TableCell>
                  <TableCell className="tableHeader" style={{ width: "150px" }}>
                    해시
                  </TableCell>
                  <TableCell className="tableHeader" style={{ width: "150px" }}>
                    서열 정렬 결과
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* 여기에 추가 테이블의 데이터 매핑 및 렌더링 */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default DnaView;
