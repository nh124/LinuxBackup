import React from "react";
import { Button } from "./styles/button.style";
import { 
Image,
RestLabel, } from "./styles/restaurant.style";
import {
  RestuarantContainer,
  RestaurantOverlay,
  CollegeLogoOverlay,
} from "./styles/AppContainer.style";
import { Welcome, WelComeMessage } from "./styles/Welcome.style";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function restaurant() {
  return (
    <RestuarantContainer>
      <div className="search">
        <Button left="95%" top="10px" color="red">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt="LoginLogo"
                width={56}
                height={58}
                onClick={() => (window.location.href = "/profile")}
            />
        </Button>
        <Button left="10px" top="10px" color="red" width="56px" height="58px">
          options
        </Button>
        
        <Button
          left="90%"
          top="10px"
          onClick={() => {
            window.location.href = "/home";
          }}
        >
          <img
            src="data:image/png;base64,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"
            alt="LoginLogo"
            width={56}
            height={58}
          />
        </Button>
        <div className="profileInfo"></div>
      </div>

      <CollegeLogoOverlay
        width="90em"
        height="90em"
        left="15%"
        bottom="-20%"
      >
        <RestaurantOverlay>
            <Welcome
                color="red"
                top="150px"
                width="400px"
                height="100px"
            >
            <RestLabel color="white">Cafe Lucia!</RestLabel>
            </Welcome>
            <Image
                src="https://popmenucloud.com/cdn-cgi/image/width%3D1536%2Cheight%3D1536%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/zoxhrfbw/b51d5f58-0eb0-4d58-9b40-17737536f62c.jpg"
                width="400"
                height="400"
                border="4px solid #ddd"
                top="275px"
            /> 
            <Welcome
                color="#297caeb"
                width="400px"
                height="100px"
                top="675px"
            >
                <p>dgdgsgdsggggggggggggggggggg!</p>
            </Welcome>
            <Welcome
                color="#2B4675"
                width="400px"
                height="300px"
                top="775px"
            >
                <h1>Cafeffefeff!</h1>
            </Welcome>
        </RestaurantOverlay>
      </CollegeLogoOverlay>
    </RestuarantContainer>
  );
}

// rfce
