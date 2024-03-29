import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getYears } from "../utils/years_api";
import { useEffect, useState } from "react";
import { postStudentYear } from '../utils/users_api';
import { UserContext } from "../context/UserContext";
import { useContext } from 'react';
import React from 'react';
import Typography from '@mui/material/Typography';
import Loader from "./Loader";

export default function YearForm({setYear, year}: {setYear: React.Dispatch<React.SetStateAction<number>>, year: number}) {
  const [years, setYears] = useState([]);
  const { user, setUser } = useContext<any>(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  
  const handleChange = (event: SelectChangeEvent) => {
    return postStudentYear(user.student_id, event.target.value.toString())
    .then(({ year }: any) => {
      setYear(year.year_id)
    });
  };

  useEffect(() => {
    getYears().then((years) => {
      setYears(years);
      setLoading(false);
    })
  }, []);

  if(loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography sx={{ mb: 1 }}>Select a year to get started.</Typography>
      <FormControl fullWidth>
        <InputLabel id="select-year-dropdown">Year</InputLabel>
        <Select
          labelId="select-year-dropdown"
          id="select-year-dropdown"
          value=""
          label="Year"
          onChange={handleChange}
        >
          {years.map((singleYear: any) => {
            return (
              <MenuItem key={singleYear.year_id} value={singleYear.year_id}>{singleYear.year}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
