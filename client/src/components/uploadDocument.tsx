import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import DescriptionIcon from "@mui/icons-material/Description"; // Icon for PDF document
import toast from "react-hot-toast";

interface FileWithPath extends File {
  path?: string;
}

interface UploadedPdf {
  file_name: string;
  file_url: string;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
}

const UploadDocument = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [embeddingStarted, setEmbeddingStarted] = useState(false);
  const [embeddingComplete, setEmbeddingComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploadedPdfs, setUploadedPdfs] = useState<UploadedPdf[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPath[]>([]); // State for selected files
  const [teachers, setTeachers] = useState<Teacher[]>([]); // Teachers list
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null); // Selected teacher

  useEffect(() => {
    // Fetch teachers when component mounts
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teachers/");
        setTeachers(response.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
        setError("Failed to fetch teachers.");
      }
    };

    fetchTeachers();
  }, []);

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const pdfFiles = acceptedFiles.filter(
      (file) => file.type === "application/pdf"
    );
    if (pdfFiles.length > 0) {
      console.log("Selected PDFs:", pdfFiles);
      setSelectedFiles(pdfFiles); // Store selected files
      setError(null);
    } else {
      setError("Please upload only PDF files.");
    }
  };

  const handleUpload = async () => {
    if (!selectedTeacher) {
      toast.error("Please select a teacher before uploading.");
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error("No file selected for upload!");
      return;
    }

    console.log("Uploading PDFs:", selectedFiles);
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("teacher_id", selectedTeacher); // Include selected teacher in the form
    selectedFiles.forEach((file: FileWithPath) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/pdf/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      const fileName = selectedFiles[0].name; // Check the first file's status

      // Show Snackbar that embedding has started
      setEmbeddingStarted(true);
      setSuccessMessage("Embedding process started for: " + fileName);

      // Start checking embedding status
      checkEmbeddingStatus(fileName);
    } catch (err: any) {
      console.error("Upload error:", err.response?.data);
      setError(
        err.response?.data?.detail || "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const checkEmbeddingStatus = async (fileName: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/check-status/${fileName}/`
        );
        if (response.status === 200) {
          setEmbeddingComplete(true);
          setSuccessMessage(response.data.message); // Capture the success message
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error checking embedding status:", err);
        //@ts-ignore
        if (err.response?.status === 404) {
          // Handle not found status if necessary
        }
      }
    }, 3000); // Check every 3 seconds
  };

  const fetchUploadedPdfs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pdfs/all/");
      setUploadedPdfs(response.data);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
      setError("Failed to fetch uploaded PDFs.");
    }
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
    fetchUploadedPdfs();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
  });

  return (
    <div className={`option-container`}>
      <div className="title">Upload a Document</div>
      <p style={{ marginBottom: "20px" }}>
        Feed a document to our Large Language Model
      </p>

      {/* Teacher Selection Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Select Teacher Persona</InputLabel>
        <Select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value as string)}
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.name} - {teacher.subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper
        {...getRootProps()}
        elevation={3}
        sx={{
          boxShadow: "none",
          marginTop: "20px",
          padding: "20px",
          textAlign: "center",
          border: isDragActive ? "2px solid #3f51b5" : "2px dashed #ccc",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography color="primary">Drop the PDF files here...</Typography>
        ) : (
          <Typography>
            Drag & drop your PDF files here, or click to select files
          </Typography>
        )}
      </Paper>

      {/* Display selected files */}
      <div>
        <Typography variant="h6">Selected Files:</Typography>
        {selectedFiles.length > 0 ? (
          <List>
            {selectedFiles.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No files selected.</Typography>
        )}
      </div>

      <div className="button-section" style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleUpload} disabled={uploading || !selectedTeacher}>
          {uploading ? <CircularProgress size={24} /> : "Upload Document"}
        </button>
        <button onClick={handleOpenDrawer}>Uploaded PDFs</button>
      </div>

      {error && (
        <p className="error-message" style={{ marginTop: "10px" }}>
          {error}
        </p>
      )}

      {/* Snackbar for embedding started */}
      <Snackbar
        open={embeddingStarted}
        autoHideDuration={6000}
        onClose={() => setEmbeddingStarted(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setEmbeddingStarted(false)} severity="info">
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar for embedding completion */}
      <Snackbar
        open={embeddingComplete}
        autoHideDuration={6000}
        onClose={() => setEmbeddingComplete(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setEmbeddingComplete(false)} severity="success">
          {successMessage || "Embedding successful! Your document is ready."}
        </Alert>
      </Snackbar>

      {/* Drawer for uploaded PDFs */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "300px",
            backgroundColor: "white",
          },
        }}
      >
        <div
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <Typography
            variant="h6"
            sx={{
              padding: "10px 16px",
              backgroundColor: "var(--secondary)",
              color: "var(--text)",
              fontFamily: "var(--font-primary)",
            }}
          >
            Uploaded PDFs
          </Typography>
          <Divider />
          <List>
            {uploadedPdfs.length > 0 ? (
              uploadedPdfs.map((pdf, index) => (
                <ListItem
                  component="a"
                  href={pdf.file_url}
                  key={index}
                  sx={{
                    color: "#000",
                    padding: "10px 16px",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  <ListItemText
                    primary={pdf.file_name}
                    sx={{ color: "#000" }}
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ padding: "10px", color: "#000" }}>
                No PDFs uploaded yet.
              </Typography>
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default UploadDocument;
