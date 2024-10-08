import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";


function StudentManager({
    students,
}: {
    students: any;
}) {
    return (
        <div className="option-container">
            <div className="title">Manage Students</div>
            <p>Manage all your added students, delete, edit or make other changes</p>

            <TableContainer
                component={Paper}
                style={{ marginTop: "10px", boxShadow: "none" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Class</TableCell>
                            <TableCell align="right">Contact</TableCell>
                            <TableCell align="right">Parent Email</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((row: any) => (
                            <TableRow
                                key={row.email}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.standard}</TableCell>
                                <TableCell align="right">{row.contact_number}</TableCell>
                                <TableCell align="right">{row.parent_email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default StudentManager;
