import React, { useState, useEffect } from "react";
import axios from "axios";
import { Restaurants } from "./API/TravelAdvisoryApi";
import MapDisplay from "./Components/Map";
import List from "./Components/List";

const TravelAdvisor = () => {
  const [LocationLoLa, setLocationLoLa] = useState([]);
  const [LocationInformation, setLocationInformation] = useState([]);
  useEffect(() => {
    Restaurants()
      .then((response) => {
        for (const data of response) {
          console.log(data);
          setLocationLoLa((LocationData) => [...LocationData, data.position]);
          const datas = {
            name: data.poi.name,
            score: data.score,
            address: data.address.streetName,
            URL: data.poi.url,
          };
          let arr = [];
          arr.push(datas);
          // setLocationInformation((LocationInformation) => [
          //   ...LocationInformation,
          //   {
          //     name: data.poi.name,
          //     score: data.score,
          //     address: data.address.streetName,
          //     URL: data.poi.url,
          //   },
          // ]);
        }
      })
      .catch((err) => console.log(err));
    console.log(LocationInformation);
  }, []);
  return (
    <div className="w-full h-screen flex flex-row">
      <List />
      <MapDisplay LocationLoLa={LocationLoLa} />
    </div>
  );
};

export default TravelAdvisor;
