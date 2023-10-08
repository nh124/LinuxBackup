/* eslint-disable */
import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import useStyles from "./style";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

export default function List({ places, childClicked, isLoading }) {
  const classes = useStyles();
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [elRefs, setElRefs] = useState([]);
  console.log({ childClicked });
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);
  useEffect(() => {
    console.log("elRefs", { elRefs });
  }, []);
  return (
    <div className="classes.container">
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="Hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProf={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      ;
    </div>
  );
}
