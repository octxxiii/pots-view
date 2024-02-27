import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

type Props = {
  // 여기에 props의 타입을 정의합니다.
  message: string;
  count?: number; // 선택적 속성
};

const DnaView: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          악성코드 DNA 분석 결과 시각화
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {/* 여기에 테이블 로우를 추가하세요 */}
              <TableRow>
                <TableCell component="th" scope="row">
                  분석요청ID
                </TableCell>
                <TableCell align="right">/* 요청 ID 값 */</TableCell>
                <TableCell align="right">/* 해시 */</TableCell>
                <TableCell align="right">/* 파일명 */</TableCell>
                <TableCell align="right">/* 결과 명칭 */</TableCell>
                <TableCell align="right">/* 추적 선호 */</TableCell>
                {/* 각 셀에 해당하는 데이터를 넣어야 합니다 */}
              </TableRow>
              {/* 추가 로우를 위한 코드 */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DnaView;
