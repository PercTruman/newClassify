import React, {useContext} from 'react'
import { UserContext } from './context/UserContext';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function AddStudents() {
  const { user } = useContext(UserContext)
  const [personName, setPersonName] = React.useState([]);
  const names = user && user.students.map(student => student.name)
  const ids = user && user.students.map(student => student.id)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Add Students</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names ? names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem> )): null
          }
          
        </Select>
      </FormControl>
    </div>
  );
  
}

export default AddStudents


//   const handleOnChange = (position) => {
  //       const updatedCheckedState = checkedState.map((item, index) =>
  //         index === position ? !item : item
  //       );
  //       setCheckedState(updatedCheckedState);
  //     };
  //     if (!user)  return <p>Loading...</p>; 
    
  //     const studentCheckboxes = user && user.students.map((s, index) => ( //builds the checkboxes next to all user's students' names.
  //       <div key={s.id}>
  //         <input
  //           type="checkbox"
  //           id={`${index}`}
  //           name={s.name}
  //           value={checkedState[index]}
  //           onChange={() => handleOnChange(index)}
  //         />
  //         <label htmlFor={`custom-checkbox-${index}`}>{s.name}</label>
  //       </div>
  //     ));

  // const submitForUpdate = (e) => {
  //   e.preventDefault();
  //   const indexArray = checkedState
  //     .map((value, index) => {
  //       if (value === true) {
  //         return studentIds[index];
  //       } else {
  //         return null;
  //       }
  //     })
  //     .filter((element) => element !== null);

  //   fetch(`/student_subjects/${id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       indexArray,
  //       user_id: user.id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((student_subject_array) =>
  //       addStudentNamesToList(student_subject_array)
  //     );
  // };

  // function addStudentNamesToList(array) {
  //   const studentIndexes = array.map((a) => a.student_id); //returns indexes from backend
  //   const enrolledStudentIndexes = enrolledStudents.map((es) => es.id); //grabs currently enrolled students' indexes
  //   const totalOfStudentIndexes = studentIndexes.concat(enrolledStudentIndexes); //merges 2 previous arrays into one array
  //   const onlyUniqueIndexes = [...new Set(totalOfStudentIndexes)]; //removes duplicate indexes
  //   const studentsForDisplay = user.students.filter((s) =>
  //     onlyUniqueIndexes.includes(s.id) ? s : null
  //   );
  //   rebuildStudentList(studentsForDisplay);
  // }
  // function rebuildStudentList(studentsForDisplay) {
  //   setEnrolledStudents(studentsForDisplay);
  // }

  // const displayedStudents =
  //   enrolledStudents &&
  //   enrolledStudents.map((student) => (
  //     <Grid
  //       key={student.id}
  //       sx={{ padding: "10px", margin: "auto", textAlign: "center" }}
  //     >
  //       {student.name}
  //     </Grid>
  //   ));
    
  // return (
  //   <div>AddStudents
  //        <Grid sx={{ justifyContent: "center" }} container spacing={2}></Grid>
  //         <Grid
  //           sx={{ justifyContent: "center" }}
  //           container
  //           spacing={2}
  //           marginBottom="4rem"
  //         >
  //           <Grid>
  //             <form onSubmit={submitForUpdate}>
  //               {studentCheckboxes}
  //               <Button
  //                 sx={{ marginLeft: "2rem", marginTop: "2rem" }}
  //                 variant="contained"
  //                 type="submit"
  //               >
  //                 Add Students
  //               </Button>

  //               <Button
  //                 variant="contained"
  //                 onClick={() => navigate("/-subjects")}
  //                 sx={{ marginLeft: "2rem", marginTop: "2rem" }}
  //               >
  //                 Back to All Subjects
  //               </Button>
  //             </form>
  //           </Grid>
  //         </Grid>
  //         <Grid container sx={{ justifyContent: "center" }}>
  //         <Grid>
  //           <h3>Currently Enrolled Students:</h3>
  //           {displayedStudents}
  //         </Grid>
  //       </Grid>
  //   </div>
  // )