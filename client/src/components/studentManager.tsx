import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GoPencil } from "react-icons/go";
import { FaRegTrashCan } from "react-icons/fa6";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Student {
  name: string;
  email: string;
  standard: string;
  contact_number: string;
  parent_email: string;
}

interface StudentManagerProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

function StudentManager({ students, setStudents }: StudentManagerProps) {
  const [open, setOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const handleEdit = (student: Student) => {
    setEditStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditStudent(null);
  };

  const handleSave = async () => {
    if (!editStudent) return;

    try {
      await axios.put(
        `http://localhost:8000/api/students/edit/${editStudent.email}/`,
        editStudent
      );
      handleClose();
      toast.success("Student updated successfully!");
      location.reload();
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Error updating student. Please try again.");
    }
  };

  // Delete student API call
  const handleDelete = async (email: string) => {
    console.log("Deleting student with email:", email);
    console.log(
      "setStudents is a function:",
      typeof setStudents === "function"
    );

    try {
      await axios.delete(`http://localhost:8000/api/students/delete/${email}/`);

      setStudents((prevStudents) =>
        prevStudents.filter((s) => s.email !== email)
      );
      toast.success("Student deleted successfully!"); // Use toast for feedback
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student. Please try again."); // Use toast for feedback
    }
  };

  return (
    <div className={`option-container `}>
      <div className="title">Manage Students</div>
      <p>Manage all your added students, delete, edit or make other changes</p>

      <TableContainer
        component={Paper}
        className="table"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          border: "1px solid var(--secondary)",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Student Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Class</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Parent Email</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => (
              <TableRow
                key={row.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.standard}</TableCell>{" "}
                {/* Update to 'standard' */}
                <TableCell align="left">{row.contact_number}</TableCell>
                <TableCell align="left">{row.parent_email}</TableCell>
                <TableCell align="left">
                  <GoPencil onClick={() => handleEdit(row)} className="icon">
                    Edit
                  </GoPencil>
                  <FaRegTrashCan
                    onClick={() => handleDelete(row.email)}
                    className="icon"
                  >
                    Delete
                  </FaRegTrashCan>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Student Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          {editStudent && ( // Render fields only if editStudent is not null
            <>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={editStudent.email}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, email: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Class"
                fullWidth
                value={editStudent.standard} // Update to 'standard'
                onChange={(e) =>
                  setEditStudent({ ...editStudent, standard: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Contact"
                fullWidth
                value={editStudent.contact_number}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    contact_number: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Parent Email"
                fullWidth
                value={editStudent.parent_email}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    parent_email: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudentManager;
