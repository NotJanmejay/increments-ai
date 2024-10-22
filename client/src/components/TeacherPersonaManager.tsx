import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { HOST } from "../../config";

interface TeacherPersona {
  id: number;
  name: string;
  tagline: string;
  subject: string;
  description: string;
  greetings: string;
}

function PersonaCard({
  teacher,
  onEdit,
  onDelete,
}: {
  teacher: TeacherPersona;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="teacher-card">
      <p className="name">{teacher.name}</p>
      <p className="subject">{teacher.subject}</p>
      <label>Tagline</label>
      <p className="tagline">{teacher.tagline}</p>
      <label>Greetings</label>
      <p className="tagline">{teacher.greetings}</p>
      <label>Description</label>
      <p className="description">{teacher.description}</p>
      <div className="button-section">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

const TeacherPersonaManager = () => {
  const [personas, setPersonas] = useState<TeacherPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentPersona, setCurrentPersona] = useState<TeacherPersona | null>(
    null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // New state variables to track input changes
  const [id, setId] = useState<number>(-1);
  const [name, setName] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [greetings, setGreetings] = useState<string>("");

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await axios.get(`${HOST}/api/teachers/all/`);
        setPersonas(response.data);
      } catch (err) {
        setError("Failed to fetch teacher personas.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  const handleEdit = (teacher: TeacherPersona) => {
    setCurrentPersona(teacher);
    setId(teacher.id);
    setName(teacher.name);
    setTagline(teacher.tagline);
    setSubject(teacher.subject);
    setDescription(teacher.description);
    setGreetings(teacher.greetings);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = (teacher: TeacherPersona) => {
    setCurrentPersona(teacher);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentPersona(null);
    setId(-1);
    setName("");
    setTagline("");
    setSubject("");
    setDescription("");
  };

  const handleDialogConfirm = async () => {
    if (isEditing && currentPersona) {
      // Include greetings in updatedPersona
      const updatedPersona: TeacherPersona = {
        id,
        name,
        tagline,
        subject,
        description,
        greetings, // Include greetings
      };

      try {
        await axios.put(
          `${HOST}/api/teachers/edit/${currentPersona.id}/`,
          updatedPersona
        );
        setPersonas((prev) =>
          prev.map((persona) =>
            persona.id === currentPersona.id ? updatedPersona : persona
          )
        );
        toast.success("Teacher persona updated successfully!");
      } catch (err) {
        toast.error("Failed to update teacher persona.");
      }
    } else if (currentPersona) {
      try {
        await axios.delete(`${HOST}/api/teachers/delete/${currentPersona.id}/`);
        setPersonas((prev) =>
          prev.filter((persona) => persona.id !== currentPersona.id)
        );
        toast.success("Teacher persona deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete teacher persona.");
      }
    }
    handleDialogClose();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`option-container`}>
      <div className="title">Manage Teacher Persona</div>
      <p>Manage all the added teacher personas here</p>
      <div className="teacher-persona-container">
        {personas.map((teacher) => (
          <PersonaCard
            key={teacher.id}
            teacher={teacher}
            onEdit={() => handleEdit(teacher)}
            onDelete={() => handleDelete(teacher)}
          />
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {isEditing ? "Edit Teacher Persona" : "Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          {isEditing ? (
            <>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Greetings"
                value={greetings}
                onChange={(e) => setGreetings(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
              />
            </>
          ) : (
            <DialogContentText>
              Are you sure you want to delete the teacher persona "
              {currentPersona?.name}"?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogConfirm} color="primary">
            {isEditing ? "Save" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherPersonaManager;
