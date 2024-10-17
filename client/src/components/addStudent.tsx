import React from "react";
import toast from "react-hot-toast";

function AddStudentComponent({ setStudents }: { setStudents: any }) {
  const [studentData, setStudentData] = React.useState({
    name: "",
    email: "",
    standard: "",
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
        standard: studentData.standard,
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
        standard: studentData.standard,
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
      standard: "",
      contact: "",
      parentEmail: "",
    });
  };

  const isDisabled = !(
    studentData.name &&
    studentData.email &&
    studentData.standard &&
    studentData.contact &&
    studentData.parentEmail
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
          name="contact"
          placeholder="+91 90165 889044"
          value={studentData.contact}
          onChange={handleChange}
        />
        <label htmlFor="">
          Parent Email Address<sup>*</sup>
        </label>
        <input
          type="email"
          name="parentEmail"
          placeholder="johndoefather@email.com"
          value={studentData.parentEmail}
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
