import React from "react";
import toast from "react-hot-toast"; // Uncomment if you want to use toast

function AddTeacherPersona() {
  const [teacherData, setTeacherData] = React.useState({
    name: "",
    tagline: "",
    subject: "",
    description: "",
    greetings: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleAddTeacher = () => {
    console.log(
      JSON.stringify({
        name: teacherData.name,
        tagline: teacherData.tagline,
        subject: teacherData.subject,
        description: teacherData.description,
        greetings: teacherData.greetings,
      }),
    );

    fetch("http://localhost:8000/api/teachers/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: teacherData.name,
        tagline: teacherData.tagline,
        subject: teacherData.subject,
        description: teacherData.description,
        greetings: teacherData.greetings,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Teacher Added Successfully.");
      });

    // Reset the form fields
    setTeacherData({
      name: "",
      tagline: "",
      subject: "",
      description: "",
      greetings: "",
    });
  };

  return (
    <div className="option-container">
      <div className="title">Add Teacher Persona</div>
      <p>
        Provide teacher-specific personas to give students the feeling of school
        from anywhere.
      </p>
      <div id="input-fields">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Mr. Divyank Bhaskar"
          value={teacherData.name}
          onChange={handleChange}
        />
        <label htmlFor="tagline">Tagline</label>
        <input
          type="text"
          name="tagline"
          placeholder="Add a short tagline for your teacher"
          value={teacherData.tagline}
          onChange={handleChange}
        />
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="Subject that your teacher teaches"
          value={teacherData.subject}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="How would you describe this teacher"
          value={teacherData.description}
          onChange={handleChange}
        />
        <label htmlFor="greetings">Greetings</label>
        <input
          type="text"
          name="greetings"
          placeholder="How would you like this teacher to greet students"
          value={teacherData.greetings}
          onChange={handleChange}
        />
      </div>
      <div className="button-section">
        <button onClick={handleAddTeacher}>Add Persona</button>
      </div>
    </div>
  );
}

export default AddTeacherPersona;
