import React from "react";
import toast from "react-hot-toast";

function AddStudentComponent({ setStudents }: { setStudents: any }) {
  const [studentData, setStudentData] = React.useState({
    name: "",
    email: "",
    standard: "",
    contact_number: "", 
    parent_email: "", 
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
        standard: studentData.standard,
        contact_number: studentData.contact_number,
        parent_email: studentData.parent_email, 
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
        standard: studentData.standard,
        contact_number: studentData.contact_number,
        parent_email: studentData.parent_email, 
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
      standard: "",
      contact_number: "", 
      parent_email: "",
    });
  };

  const isDisabled = !(
    studentData.name &&
    studentData.email &&
    studentData.standard &&
    studentData.contact_number && 
    studentData.parent_email 
  );

  return (
    <div className={`option-container`}>
      <div className="title">Add Student</div>
      <p>Add your students here to generate their credentials</p>
      <div id="input-fields">
        <label htmlFor="">
          Name <sup>*</sup>
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={studentData.name}
          onChange={handleChange}
        />
        <label htmlFor="">
          Email <sup>*</sup>
        </label>
        <input
          type="email"
          name="email"
          placeholder="johndoe@email.com"
          value={studentData.email}
          onChange={handleChange}
        />
        <label htmlFor="">
          Class <sup>*</sup>
        </label>
        <input
          type="text"
          name="standard"
          placeholder="12th"
          value={studentData.standard}
          onChange={handleChange}
        />
        <label htmlFor="">
          Contact Number<sup>*</sup>
        </label>
        <input
          type="tel"
          name="contact_number" 
          placeholder="+91 90165 889044"
          value={studentData.contact_number} 
          onChange={handleChange}
        />
        <label htmlFor="">
          Parent Email Address<sup>*</sup>
        </label>
        <input
          type="email"
          name="parent_email" 
          placeholder="johndoefather@email.com"
          value={studentData.parent_email} 
          onChange={handleChange}
        />
      </div>
      <div className="button-section">
        <button
          onClick={handleAddStudent}
          disabled={isDisabled}
          title={isDisabled ? "Please add all details first" : ""}
        >
          Add Student
        </button>
      </div>
    </div>
  );
}

export default AddStudentComponent;
