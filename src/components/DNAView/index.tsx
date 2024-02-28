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
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

type DnaViewProps = {
  isOpen: boolean;
};

const tempData = [
  {
    id: "1",
    hash: "abc123",
    fileName: "file1.exe",
    groupName: "Group A",
    extraInfo: "N/A",
  },
  {
    id: "2",
    hash: "def456",
    fileName: "file2.exe",
    groupName: "Group B",
    extraInfo: "N/A",
  },
];

const DnaView: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [filter, setFilter] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
          악성코드 DNA 분석 결과 시각화
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <FormControl
            variant="filled"
            sx={{ minWidth: 200, maxHeight: 100, color: "black" }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              필터링 대상
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={filter}
              onChange={handleFilterChange}
              sx={{ color: "black", ".MuiSvgIcon-root": { color: "black" } }} // MUI icon color
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="id">분석요청ID</MenuItem>
              <MenuItem value="hash">해시</MenuItem>
              {/* 추가 필터링 옵션 */}
            </Select>
          </FormControl>
          <TextField
            id="filled-basic"
            label="필터링 조건"
            variant="filled"
            sx={{
              color: "black",
              ".MuiInputBase-root": { color: "black" },
              marginLeft: 2,
            }} // Text field styles
          />
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
            sx={{ color: "black", "&.Mui-checked": { color: "black" } }} // Checkbox styles
          />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">분석요청ID</TableCell>
                <TableCell align="center">해시</TableCell>
                <TableCell align="center">파일명</TableCell>
                <TableCell align="center">그룹 명칭</TableCell>
                <TableCell align="center">추가 정보</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{/* 테이블 바디 데이터 */}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DnaView;
