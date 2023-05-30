import React from "react";
import { listOfItems } from "./listOfItems";
import Listitem from "./Listitem";
// import {CgProfile} from
import { CgProfile } from "react-icons/cg";
import { RiRestaurant2Line } from "react-icons/ri";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";

const List = () => {
  const name = "List";
  return (
    <div className="mt-9 px-1">
      {listOfItems.map((item, idx) => (
        <Listitem
          key={idx}
          name={item}
          profile={<CgProfile size={30} />}
          restaurant={<RiRestaurant2Line size={30} />}
          navigation={<FaMapMarkedAlt size={30} />}
          chat={<BsChatRightDotsFill size={30} />}
        />
      ))}
    </div>
  );
};

export default List;
