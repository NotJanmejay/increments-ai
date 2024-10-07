import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

function StudentManager({ students, setStudents }: { students: any, setStudents: any }) {
    const [open, setOpen] = React.useState(false);
    const [editStudent, setEditStudent] = React.useState<any>(null);

    // Open modal to edit student
    const handleEdit = (student: any) => {
        setEditStudent(student);
        setOpen(true);
    };

    // Close modal
    const handleClose = () => {
        setOpen(false);
        setEditStudent(null);
    };

    // Update student details
    const handleSave = () => {
        //@ts-ignore
        setStudents(students.map(s => (s.email === editStudent.email ? editStudent : s)));
        handleClose();
    };

    // Delete a student
    const handleDelete = (email: any) => {
        //@ts-ignore
        setStudents(students.filter(s => s.email !== email));
    };

    return (
        <div className='option-container'>
            <div className="title">Manage Students</div>
            <p>Manage all your added students, delete, edit or make other changes</p>

            <TableContainer component={Paper} style={{ marginTop: "10px", boxShadow: 'none' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Class</TableCell>
                            <TableCell align="right">Contact</TableCell>
                            <TableCell align="right">Parent Email</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((row: any) => (
                            <TableRow key={row.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.class}</TableCell>
                                <TableCell align="right">{row.contact}</TableCell>
                                <TableCell align="right">{row.parentEmail}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(row)} size="small">Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(row.email)} size="small" style={{ marginLeft: '10px' }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Student Modal */}
            {editStudent && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Student</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Name"
                            fullWidth
                            value={editStudent.name}
                            onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            fullWidth
                            value={editStudent.email}
                            disabled // Cannot edit email
                        />
                        <TextField
                            margin="dense"
                            label="Class"
                            fullWidth
                            value={editStudent.class}
                            onChange={(e) => setEditStudent({ ...editStudent, class: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Contact"
                            fullWidth
                            value={editStudent.contact}
                            onChange={(e) => setEditStudent({ ...editStudent, contact: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Parent Email"
                            fullWidth
                            value={editStudent.parentEmail}
                            onChange={(e) => setEditStudent({ ...editStudent, parentEmail: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleSave} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}

export default StudentManager;