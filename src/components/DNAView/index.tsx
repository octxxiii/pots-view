import React from "react";
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

const DnaView: React.FC<DnaViewProps> = ({ isOpen }) => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom style={{ color: "black" }}>
          악성코드 DNA 분석 결과 시각화
        </Typography>
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
            <TableBody>
              {tempData.length > 0 ? (
                tempData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell align="center">{data.id}</TableCell>
                    <TableCell align="center">{data.hash}</TableCell>
                    <TableCell align="center">{data.fileName}</TableCell>
                    <TableCell align="center">{data.groupName}</TableCell>
                    <TableCell align="center">{data.extraInfo}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DnaView;
