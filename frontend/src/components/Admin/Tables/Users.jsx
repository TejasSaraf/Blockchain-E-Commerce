import React, { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUsers } from "../../../scripts/admin";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const LoadUsers = async () => {
      await getUsers().then((data) => {
        setUsers(data.data.data);
        setLoading(false);
      });
    };
    LoadUsers();
  }, []);

  const columns = ["Email", "Name", "Phone No", "Is Admin"];

  if (loading) {
    return (
      <h1 className="w-full text-center text-xl MaisonNeueMonoRegular">
        Loading ......
      </h1>
    );
  } else {
    return (
      <div>
        <TableContainer component={Paper} className="MaisonNeueMonoRegular">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <StyledTableCell>
                      <p className="MaisonNeueMonoRegular">{column}</p>
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <StyledTableRow key={data._id}>
                    <StyledTableCell component="th" scope="row">
                      <p className="MaisonNeueMonoRegular">
                        {data.email}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p className="MaisonNeueMonoRegular">{data.name}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p className="MaisonNeueMonoRegular">{data.phoneNo}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p className="MaisonNeueMonoRegular">
                        {data.isAdmin ? 'Admin': "Normal User"}
                      </p>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default Users;
