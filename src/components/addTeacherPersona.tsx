// import React from "react"
// import toast from 'react-hot-toast';

function AddTeacherPersona() {
    return (
        <div className='option-container'>
            <div className="title">Add Teacher Persona</div>
            <p>Provide teacher specific personas to give students the feeling of school from anywhere</p>
            <div id="input-fields">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder='Mr. Divyank Bhaskar'
                // value={studentData.name}
                // onChange={handleChange}
                />
                <label htmlFor="name">Tagline</label>
                <input
                    type="text"
                    name="tagline"
                    placeholder='Add a short tagline of your teacher'
                // value={studentData.name}
                // onChange={handleChange}
                />
                <label htmlFor="name">Subject</label>
                <input
                    type="text"
                    name="subject"
                    placeholder='Subject that your teacher teachs'
                // value={studentData.name}
                // onChange={handleChange}
                />
                <label htmlFor="name">Description</label>
                <textarea
                    name="description"
                    placeholder='How would your describe this teacher'
                // value={studentData.name}
                // onChange={handleChange}
                />
                <label htmlFor="name">Greetings</label>
                <input
                    type="text"
                    name="greetings"
                    placeholder='How would you like this teacher to greet students'
                // value={studentData.name}
                // onChange={handleChange}
                />

            </div>
            <div className='button-section'>
                <button>Add Persona</button>
            </div>
        </div>
    );
}

export default AddTeacherPersona;