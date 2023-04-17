import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Container, Snackbar, TextField} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useForm} from "react-hook-form";
import './component.css'
import {allCourses, newCourse} from "../common/api";

export default function Courses() {

  const [courses, setCourses] = React.useState([]);
  const [openNotification, setOpenNotification] = React.useState(false);

  const { register, formState: { errors, isSubmitted, isSubmitSuccessful }, handleSubmit, getValues, reset } = useForm();
  const onSubmit = async (data) => {
    if(Object.keys(errors).length === 0 && errors.constructor === Object) {
      const values = getValues();
      const courseRequest = {
        name: values.name
      };
      await newCourse(courseRequest).then(
          response => {
            setOpenNotification(true);
          }
      );
    }
  };
  React.useEffect(() => {
    reset();
    allCourses().then(
        response => {
          const rows = response.map(s => {
            const row = {
              id: s.id,
              name: s.name
            }
            return row;
          });
          setCourses(rows);
        }
    );
  }, [isSubmitSuccessful]);

  const courseColumns = [
    { field: 'id', type: 'number', headerName: 'ID', width: 30 },
    { field: 'name', headerName: 'Course name', width: 130 }
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
          Create course
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display: "flex", alignItems: "flex-end"}}>
          <TextField
              error={errors.name?true:false}
              className="form-input"
              label="Course name"
              {...register("name", { required: "Course name is required" })}
          />

          <TextField type="submit" />
        </Box>
        {courses.length > 0 &&
        <Box sx={{height: '500px', width: '100%', marginTop: '50px'}}>
          <Typography variant="h8">
            All courses:
          </Typography>

          <DataGrid
              rows={courses}
              columns={courseColumns}
          />
        </Box>
        }
      </Container>
  );
}
