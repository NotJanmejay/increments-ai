import './App.css'
import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

function AddStudentComponent({ setStudents }: { setStudents: any }) {
  const [studentData, setStudentData] = React.useState({
    name: '',
    email: '',
    class: '',
    contact: '',
    parentEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleAddStudent = () => {
    setStudents((prevStudents: any) => [...prevStudents, studentData]);
    // Clear form after adding student
    setStudentData({
      name: '',
      email: '',
      class: '',
      contact: '',
      parentEmail: '',
    });
    toast.success("Student Added Successfully.")
  };

  return (
    <div className='option-container'>
      <div className="title">Add Student</div>
      <p>Add your students here to generate their credentials</p>
      <div id="input-fields">
        <input
          type="text"
          name="name"
          placeholder='Name'
          value={studentData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder='Email Address'
          value={studentData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="class"
          placeholder='Class'
          value={studentData.class}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="contact"
          placeholder='Contact Number'
          value={studentData.contact}
          onChange={handleChange}
        />
        <input
          type="email"
          name="parentEmail"
          placeholder='Parent Email Address'
          value={studentData.parentEmail}
          onChange={handleChange}
        />
      </div>
      <div className='button-section'>
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
    </div>
  );
}

function UploadDocument() {
  const onDrop = (acceptedFiles: any) => {
    // Handle the file upload, currently just logging
    //@ts-ignore
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      console.log('Uploaded PDFs:', pdfFiles);
    } else {
      console.log('Please upload only PDF files.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': []
    },
  });

  return (
    <div className='option-container'>
      <div className="title">Upload a Document</div>
      <p>Feed a document to our Large Language Model</p>

      <Paper
        {...getRootProps()}
        elevation={3}
        sx={{
          boxShadow: 'none',
          marginTop: "20px",
          padding: '20px',
          textAlign: 'center',
          border: isDragActive ? '2px solid #3f51b5' : '2px dashed #ccc',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography color="primary">
            Drop the PDF files here...
          </Typography>
        ) : (
          <Typography >
            Drag & drop your PDF files here, or click to select files
          </Typography>
        )}
      </Paper>

      <div className='button-section'>
        <button onClick={() => console.log('Handle Upload Logic')}>
          Upload Document
        </button>
      </div>
    </div>
  );
}
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

function App() {
  const [currentSection, setCurrentSection] = React.useState<String>("add-student")
  const [students, setStudents] = React.useState<any>([{
    name: "Janmejay Chatterjee",
    email: "janmejaychatterjee@gmail.com",
    class: "7th Sem",
    contact: "9016589044",
    parentEmail: "delsionrouge@gmail.com"
  }])
  return (
    <main>
      <nav id="teacher-nav">
        <span className='msbc-ai'>MSBC AI Division</span>
        <div>Dashboard</div>
        <div>Contact</div>
      </nav>
      <section>
        <div id="left-pane">
          <h1>Teacher Portal</h1>
          <p onClick={() => setCurrentSection("add-student")}>Add Students</p>
          <p onClick={() => setCurrentSection("upload-documents")}>Upload Documents</p>
          <p onClick={() => setCurrentSection("student-manager")}>Student Manager</p>
        </div>
        <div id="right-pane">
          {
            currentSection === "add-student" ? <AddStudentComponent setStudents={setStudents} /> : currentSection === "upload-documents" ? <UploadDocument /> : <StudentManager students={students} setStudents={setStudents} />
          }
        </div>
      </section>
    </main>
  )
}

export default App
