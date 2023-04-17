import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Container,
  FormControl,
  InputLabel, MenuItem, Select,
  Snackbar,
  TextField
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useForm} from "react-hook-form";
import './component.css'
import {allResults, newResult, allStudents, allCourses} from "../common/api";

export default function Results() {

  const [results, setResults] = React.useState([]);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [students, setStudents] = React.useState([]);
  const [courses, setCourses] = React.useState([]);

  const { register, formState: { errors, isSubmitSuccessful }, handleSubmit, getValues, reset } = useForm();
  const onSubmit = async (data) => {
    if(Object.keys(errors).length === 0 && errors.constructor === Object) {
      const values = getValues();
      const resultRequest = {
        studentId: values.student,
        courseId: values.course,
        score: values.score
      };
      await newResult(resultRequest).then(
          response => {
            setOpenNotification(true);
          }
      );
    }
  };
  React.useEffect(() => {
    reset();
    allResults().then(
        response => {
          const rows = response.map(s => {
            const row = {
              id: s.id,
              student: (s.student.firstName + " " + s.student.familyName),
              course: s.course.name,
              score: s.score
            }
            return row;
          });
          setResults(rows);
        }
    );
  }, [isSubmitSuccessful]);
  React.useEffect(() => {
    allStudents().then(response => {
      setStudents(response);
    });
    allCourses().then(response => {
      setCourses(response);
    });

  }, []);

  const resultColumns = [
    { field: 'id', type: 'number', headerName: 'ID', width: 30 },
    { field: 'student', headerName: 'Student', width: 130 },
    { field: 'course', headerName: 'Course', width: 130 },
    { field: 'score', headerName: 'Score', width: 130 }
  ];


  return (
      <Container sx={{ flexGrow: 1, paddingTop: "50px" }}>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={openNotification}
            onClose={() => setOpenNotification(false)}
            message="Course has been created."
        />
        <Typography variant="h6">
          Create result
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display: "flex", alignItems: "flex-end"}}>
          <FormControl sx={{width: '200px'}} error={errors.student?true:false}>
            <InputLabel id="student-select-label">Student</InputLabel>
            <Select
                labelId="student-select-label"
                id="student-select"
                label="Student"
                className="form-input"
                {...register("student", {required: "Student is required" })}
            >
              {
                students.map(s => {
                  return <MenuItem value={s.id}>{s.firstName + " " + s.familyName}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          <FormControl sx={{width: '200px'}} error={errors.course?true:false}>
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
                labelId="course-select-label"
                id="course-select"
                label="Course"
                className="form-input"
                {...register("course", { required: "Course is required" })}
            >
              {
                courses.map(s => {
                  return <MenuItem value={s.id}>{s.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          <FormControl sx={{width: '200px'}} error={errors.score?true:false}>
            <InputLabel id="score-select-label">Score</InputLabel>
            <Select
                labelId="score-select-label"
                id="score-select"
                label="Score"
                className="form-input"
                {...register("score", { required: "Score is required" })}
            >
              {
                ['A', 'B', 'C', 'D', 'E', 'F'].map(s => {
                  return <MenuItem value={s}>{s}</MenuItem>
                })
              }
            </Select>
          </FormControl>

          <TextField type="submit" />
        </Box>
        {results.length > 0 &&
        <Box sx={{height: '500px', width: '100%', marginTop: '50px'}}>
          <Typography variant="h8">
            All results:
          </Typography>

          <DataGrid
              rows={results}
              columns={resultColumns}
          />
        </Box>
        }
      </Container>
  );
}
