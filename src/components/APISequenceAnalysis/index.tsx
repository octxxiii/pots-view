import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
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
import CancelIcon from "@mui/icons-material/Cancel"; // 취소 아이콘 추가

const swalStyle = {
  background: "#333",
  color: "#fff",
};

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

const customConfirm = async (message: string): Promise<boolean> => {
  const { isConfirmed } = await Swal.fire({
    title: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
    background: "#333",
    color: "#fff",
    customClass: {
      container: "my-custom-container-class",
    },
    width: "15%",
  });
  return isConfirmed;
};

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
  extraInfo: string | null
): RowData => {
  return { id, hash, fileName, groupName, extraInfo: extraInfo || "" }; // null일 경우 빈 문자열로 대체하거나 다른 기본값으로 설정
};

// 기본 행 데이터 배열 생성
const rows: RowData[] = Array.from({ length: 10 }, (_, index) =>
  createData(
    `${index + 1}`,
    `hash${index + 1}`,
    `file${index + 1}.exe`,
    `Group ${String.fromCharCode(65 + (index % 26))}`,
    "N/A"
  )
);

type APISequenceProps = {
  isOpen: boolean;
};

function APISequence({ isOpen }: APISequenceProps) {
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
  const [orderBy, setOrderBy] = useState<string>("id");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [previousPage, setPreviousPage] = useState<number>(0); // 이전 페이지 번호 상태 추가

  const isDuplicateId = (idToCheck: string) => {
    return rowData.some((row) => row.id === idToCheck && row.id !== editingId);
  };

  useEffect(() => {
    // 편집 모드인 경우 첫 번째 입력 필드에 포커스를 맞춥니다.
    // 여기서는 editInputRef.current가 HTMLInputElement인지 확인합니다.
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  // useEffect를 사용하여 초기 로드 시 테이블을 ID로 오름차순 정렬합니다.
  useEffect(() => {
    handleRequestSort("id");
  }, []);

  // 테이블 헤더의 TableSortLabel에 대한 변경이 필요하지 않습니다.
  // handleRequestSort 함수에서 초기 정렬 기준을 ID로 설정합니다.
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

    const aParts = extractParts(a[orderBy]);
    const bParts = extractParts(b[orderBy]);

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
    return array.sort((a, b) =>
      naturalSort(a, b, orderBy as keyof RowData, orderDirection)
    );
  };

  const sortedRows = sortArray([...rowData]);

  const handleSaveClick = (rowId: string) => {
    if (isDuplicateId(editId)) {
      alert("분석 요청 ID가 중복됩니다. 다른 값을 입력해주세요.");
      return;
    }

    const updatedRows = rowData.map((row) =>
      row.id === rowId
        ? {
            ...row,
            id: editId,
            hash: editHash,
            fileName: editFileName,
            groupName: editGroupName,
            extraInfo: editingExtraInfo !== null ? editingExtraInfo : "",
          }
        : row
    );

    setRowData(updatedRows);
    saveDataToLocal(updatedRows);
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
    setEditingExtraInfo("");
  };

  // 편집 상태에서의 포커스 관리
  useEffect(() => {
    if (editingId && editInputRef.current) {
      setTimeout(() => {
        if (editInputRef.current) {
          editInputRef.current.focus();
        }
      }, 100);
    }
  }, [editingId]);

  // 이후 코드에서 편집 가능한 필드를 렌더링할 때, `editingId` 상태를 확인하여
  // 새로 추가된 행에 대해서도 텍스트 필드를 렌더링하게 됩니다.

  const saveDataToLocal = (data: RowData[]) => {
    // 로컬 저장소에 데이터 저장
    localStorage.setItem("rowData", JSON.stringify(data));
  };

  const handleDeleteClick = async (id: string) => {
    // 사용자에게 수정 중인지 확인
    const isEditing = editingId !== null;

    // 사용자가 수정 중이면 경고 메시지 표시
    if (
      isEditing &&
      !(await customConfirm("수정을 완료하지 않았습니다. 삭제하시겠습니까?"))
    ) {
      return; // 삭제 취소
    }

    // SweetAlert2를 사용하여 삭제 여부 확인
    if (await customConfirm("삭제하시겠습니까?")) {
      const updatedRows = rowData.filter((row) => row.id !== id);
      setRowData(updatedRows);
      saveDataToLocal(updatedRows); // 로컬 저장소에 저장

      if (updatedRows.length === 0) {
        // 빈 페이지가 되면 첫 페이지로 이동
        setPage(0);
      }
    }
  };

  // 수정 클릭 이벤트 핸들러
  const handleEditClick = (id: string) => {
    // 사용자에게 수정 중인지 확인
    const isEditing = editingId !== null;

    // 사용자가 수정 중이면 경고 메시지 표시
    if (
      isEditing &&
      !window.confirm("수정을 완료하지 않았습니다. 수정하시겠습니까?")
    ) {
      return; // 수정 취소
    }

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
      setEditingExtraInfo(row.extraInfo);
    }
  };

  const handleAddRow = () => {
    // 사용자에게 수정 중인지 확인
    const isEditing = editingId !== null;

    // 사용자가 수정 중이면 경고 메시지 표시
    if (
      isEditing &&
      !window.confirm("수정을 완료하지 않았습니다. 새 행을 추가하시겠습니까?")
    ) {
      return; // 추가 취소
    }

    const maxId = rowData.reduce(
      (max, item) => Math.max(max, parseInt(item.id, 10)),
      0
    );
    const newId = (maxId + 1).toString();
    const newRow = createData(newId, "", "", "", "");
    const updatedRows = [...rowData, newRow];
    setRowData(updatedRows);

    // 페이지를 변경하고, 추가된 행이 있는 페이지로 이동
    const newPage = Math.ceil(updatedRows.length / rowsPerPage) - 1;
    setPage(newPage);

    // 새 행을 편집 모드로 설정
    setEditingRow(newId);
    setEditingId(newId);
    setEditId(newId);
    setEditingHash(newId);
    setEditHash("");
    setEditingFileName(newId);
    setEditFileName("");
    setEditingGroupName(newId);
    setEditGroupName("");
    setEditingExtraInfo(newId);
    setEditingExtraInfo("");

    // setTimeout을 사용하여 포커싱을 지연시킵니다.
    setTimeout(() => {
      const editInput = document.getElementById(`hash-${newId}`);
      if (editInput) {
        editInput.focus();
      }
    }, 100);

    saveDataToLocal(updatedRows); // 로컬 저장소에 저장
  };

  const handleCancelAddRow = () => {
    const updatedRows = rowData.filter((row) => row.id !== editingRow);
    setRowData(updatedRows);
    setEditingRow(null); // 편집 상태를 초기화합니다.
    clearEditingState();
    saveDataToLocal(updatedRows); // 로컬 저장소에 저장
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // 사용자에게 수정 중인지 확인
    const isEditing = editingId !== null;

    // 사용자가 수정 중이면 경고 메시지 표시
    if (
      isEditing &&
      !window.confirm("수정을 완료하지 않았습니다. 페이지를 변경하시겠습니까?")
    ) {
      event?.preventDefault(); // 페이지 변경 취소
      return;
    }

    setPage(newPage); // 페이지 번호 업데이트
  };

  useEffect(() => {
    // rowData가 변경되면서 페이지에 데이터가 없으면 이전 페이지로 돌아갑니다.
    if (rowData.length === 0 && page !== 0) {
      setPage(page - 1); // 이전 페이지로 이동
    }
  }, [rowData]);

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
        <Box
          my={1}
          style={{
            position: "relative",
            maxHeight: "50vh",
            overflow: "auto",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
                API 어쩌구
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: "5px", height: "25px" }}
              onClick={handleAddRow}
            >
              DNA 분석 요청 추가
            </Button>
          </div>
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
                    style={{ width: "120px" }} // Actions의 너비를 늘림
                    align="right"
                  >
                    {/* Actions */}
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
                              id={`extraInfo-${row.id}`}
                              value={editingExtraInfo}
                              onChange={(e) =>
                                setEditingExtraInfo(e.target.value)
                              }
                              fullWidth
                              size="small"
                            />
                          ) : (
                            <>
                              {editingId === row.id ? (
                                <TextField
                                  id={`extraInfo-${row.id}`}
                                  value={editingExtraInfo}
                                  onChange={(e) =>
                                    setEditingExtraInfo(e.target.value)
                                  }
                                  fullWidth
                                  size="small"
                                />
                              ) : (
                                row.extraInfo
                              )}
                            </>
                          )}
                        </TableCell>

                        <TableCell align="right" style={{ flex: "0 0 25%" }}>
                          {editingId === row.id ? (
                            <>
                              <IconButton
                                onClick={() => handleSaveClick(row.id)}
                                aria-label="save"
                              >
                                <SaveIcon />
                              </IconButton>
                              <IconButton
                                onClick={handleCancelAddRow}
                                aria-label="cancel"
                              >
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <React.Fragment>
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEditClick(row.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteClick(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </React.Fragment>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={sortedRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Box>
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
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
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            1:1 유사도 분석 결과
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

export default APISequence;
