import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Container, Snackbar, TextField} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useForm} from "react-hook-form";
import './component.css'
import {allStudents, newStudent} from "../common/api";

export default function Students() {

  const [students, setStudents] = React.useState([]);
  const [openNotification, setOpenNotification] = React.useState(false);

  const { register, formState: { errors, isSubmitted, isSubmitSuccessful }, handleSubmit, getValues, reset } = useForm();
  const onSubmit = async (data) => {
    if(Object.keys(errors).length === 0 && errors.constructor === Object) {
      const values = getValues();
      const studentRequest = {
        firstName: values.firstName,
        familyName: values.familyName,
        dob: values.dob
      };
      await newStudent(studentRequest).then(
          response => {
            setOpenNotification(true);
          }
      );
    }
  };
  React.useEffect(() => {
    reset();
    allStudents().then(
        response => {
          const rows = response.map(s => {
            const row = {
              id: s.id,
              firstName: s.firstName,
              familyName: s.familyName,
              dob: s.dob.substring(0, 10)
            }
            return row;
          });
          setStudents(rows);
        }
    );
  }, [isSubmitSuccessful]);

  const studentColumns = [
    { field: 'id', type: 'number', headerName: 'ID', width: 30 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'familyName', headerName: 'Family name', width: 130 },
    { field: 'dob', headerName: 'Date of birth', width: 130 }
  ];


  return (
      <Container sx={{ flexGrow: 1, paddingTop: "50px" }}>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={openNotification}
            onClose={() => setOpenNotification(false)}
            message="Student has been created."
        />
        <Typography variant="h6">
          Create student
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display: "flex", alignItems: "flex-end"}}>
          <TextField
              error={errors.firstName?true:false}
              className="form-input"
              label="First Name"
              {...register("firstName", { required: "First name is required" })}
          />

          <TextField
              error={errors.familyName?true:false}
              className="form-input"
              label="Family Name"
              {...register("familyName", { required: "Family name is required" })}
          />

          <Box>
            <Typography>
              Date of Birth
            </Typography>
            {errors.dob &&
            <Typography sx={{color: "red", width: "200px", fontSize: "10px"}}>
              Invalid date of birth. The student must be at least
              10 years old.
            </Typography>
            }
          <TextField
              type="date"
              error={errors.dob?true:false}
              className="form-input"
              {...register("dob", {
                required: true,
                pattern: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                validate: value => {
                    let today = new Date();
                    today.setFullYear(today.getFullYear() - 10);
                    let dob = new Date(value);
                    if(dob > today) {
                      return false;
                    }
                    return true;
                }
              })}
          />
          </Box>

          <TextField type="submit" />
        </Box>
        {students.length > 0 &&
          <Box sx={{height: '500px', width: '100%', marginTop: '50px'}}>
            <Typography variant="h8">
              All students:
            </Typography>

            <DataGrid
                rows={students}
                columns={studentColumns}
            />
          </Box>
        }
      </Container>
  );
}
