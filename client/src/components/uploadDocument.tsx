import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import DescriptionIcon from "@mui/icons-material/Description";
import toast from "react-hot-toast";
import { HOST } from "../../config";

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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploadedPdfs, setUploadedPdfs] = useState<UploadedPdf[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPath[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  useEffect(() => {
    // Fetch teachers when component mounts
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${HOST}/v1/teachers/all/`);
        if (typeof response.data != "string") setTeachers(response.data);
        else setError("Failed to fetch teachers.");
      } catch (err) {
        console.error("Error fetching teachers:", err);
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
    formData.append("teacher_id", selectedTeacher);
    selectedFiles.forEach((file: FileWithPath) => {
      formData.append("file", file);
    });

    try {
      await axios.post(`${HOST}/v1/pdf/upload/${selectedTeacher}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File Uploaded Successfully!");
      setSelectedFiles([]);
    } catch (err: any) {
      console.error("Upload error:", err.response?.data);
      setError(
        err.response?.data?.detail || "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const fetchUploadedPdfs = async () => {
    try {
      const response = await axios.get(`${HOST}/v1/pdfs/all/`);
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
      <label htmlFor="">Select Teacher Persona</label>
      <FormControl fullWidth margin="normal">
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

      <div
        id="upload-documents"
        className="button-section"
        style={{ display: "flex", gap: "10px" }}
      >
        <button onClick={handleUpload} disabled={uploading || !selectedTeacher}>
          {uploading ? <CircularProgress size={24} /> : "Upload Document"}
        </button>
        <button onClick={handleOpenDrawer} disabled={!selectedTeacher}>
          Uploaded PDFs
        </button>
      </div>

      {error && (
        <p className="error-message" style={{ marginTop: "10px" }}>
          {error}
        </p>
      )}
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
