import React from "react";
import toast from "react-hot-toast";

function AddStudentComponent({ setStudents }: { setStudents: any }) {
  const [studentData, setStudentData] = React.useState({
    name: "",
    email: "",
    standard: "", // Changed from 'class' to 'standard'
    contact: "",
    parentEmail: "",
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
    console.log(
      JSON.stringify({
        name: studentData.name,
        email: studentData.email,
        standard: studentData.standard, // Ensure consistency here
        contact_number: studentData.contact,
        parent_email: studentData.parentEmail,
      })
    );
    fetch("http://localhost:8000/api/students/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: studentData.name,
        email: studentData.email,
        standard: studentData.standard, // Ensure consistency here
        contact_number: studentData.contact,
        parent_email: studentData.parentEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(
          "Student Added Successfully. Password Generated is : " +
            data.generated_password
        );
      });
    setStudentData({
      name: "",
      email: "",
      standard: "", // Changed from 'class' to 'standard'
      contact: "",
      parentEmail: "",
    });
  };

  return (
    <div className="option-container">
      <div className="title">Add Student</div>
      <p>Add your students here to generate their credentials</p>
      <div id="input-fields">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={studentData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={studentData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="standard" // Updated name here
          placeholder="Class"
          value={studentData.standard} // Updated here
          onChange={handleChange}
        />
        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={studentData.contact}
          onChange={handleChange}
        />
        <input
          type="email"
          name="parentEmail"
          placeholder="Parent Email Address"
          value={studentData.parentEmail}
          onChange={handleChange}
        />
      </div>
      <div className="button-section">
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
    </div>
  );
}

export default AddStudentComponent;
