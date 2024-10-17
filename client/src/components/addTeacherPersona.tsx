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

  let isDisabled = !(
    teacherData.name &&
    teacherData.tagline &&
    teacherData.subject &&
    teacherData.description &&
    teacherData.greetings
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleAddTeacher = () => {
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
      .then((res) => {
        if (res.status !== 201) {
          throw new Error(`Request failed with status ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        toast.success(`${teacherData.name} added to records`);
        setTeacherData({
          name: "",
          tagline: "",
          subject: "",
          description: "",
          greetings: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Something went wrong while adding teacher, check out console logs for more information"
        );
      });

    // Reset the form fields
  };

  return (
    <div className={`option-container`}>
      <div className="title">Add Teacher Persona</div>
      <p>
        Provide teacher-specific personas to give students the feeling of school
        from anywhere.
      </p>
      <div id="input-fields">
        <label htmlFor="name">
          Name <sup>*</sup>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Mr. Divyank Bhaskar"
          value={teacherData.name}
          onChange={handleChange}
        />
        <label htmlFor="tagline">
          Tagline <sup>*</sup>
        </label>
        <input
          type="text"
          name="tagline"
          placeholder="Add a short tagline for your teacher"
          value={teacherData.tagline}
          onChange={handleChange}
        />
        <label htmlFor="subject">
          Subject <sup>*</sup>
        </label>
        <input
          type="text"
          name="subject"
          placeholder="Subject that your teacher teaches"
          value={teacherData.subject}
          onChange={handleChange}
        />
        <label htmlFor="description">
          Description <sup>*</sup>
        </label>
        <textarea
          name="description"
          placeholder="How would you describe this teacher"
          value={teacherData.description}
          onChange={handleChange}
        />
        <label htmlFor="greetings">
          Greetings <sup>*</sup>
        </label>
        <input
          type="text"
          name="greetings"
          placeholder="How would you like this teacher to greet students"
          value={teacherData.greetings}
          onChange={handleChange}
        />
      </div>
      <div className="button-section">
        <button
          onClick={handleAddTeacher}
          disabled={isDisabled}
          title={isDisabled ? "Please add all details first" : ""}
        >
          Add Persona
        </button>
      </div>
    </div>
  );
}

export default AddTeacherPersona;
