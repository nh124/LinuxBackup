import React from "react";
import { listOfItems } from "./listOfItems";
import Listitem from "./Listitem";
import { CgProfile } from "react-icons/cg";
import { RiRestaurant2Line } from "react-icons/ri";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";
import { MdHome } from "react-icons/md";

const List = ({ darkMode, setTab }) => {
  return (
    <div className="mt-9 px-1">
      {listOfItems.map((item, idx) => (
        <Listitem
          key={idx}
          name={item}
          profile={
            darkMode ? (
              <CgProfile size={30} color="white" />
            ) : (
              <CgProfile size={30} />
            )
          }
          restaurant={
            darkMode ? (
              <RiRestaurant2Line size={30} color="white" />
            ) : (
              <RiRestaurant2Line size={30} />
            )
          }
          navigation={
            darkMode ? (
              <FaMapMarkedAlt size={30} color="white" />
            ) : (
              <FaMapMarkedAlt size={30} />
            )
          }
          chat={
            darkMode ? (
              <BsChatRightDotsFill size={30} color="white" />
            ) : (
              <BsChatRightDotsFill size={30} />
            )
          }
          home={
            darkMode ? <MdHome size={30} color="white" /> : <MdHome size={30} />
          }
          darkMode={darkMode}
          setTab={setTab}
        />
      ))}
    </div>
  );
};

export default List;
