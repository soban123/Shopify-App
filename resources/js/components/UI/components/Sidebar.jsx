import React from "react";
import {  Icon, Button } from "@shopify/polaris";

import {
  faCloudUploadAlt,
  faVideo,
  faCog,
  faUserAlt,
  faTimes,
  faAlignJustify
} from "@fortawesome/free-solid-svg-icons";
import Jpegtopng from '../images/Jpegtopng';

import {
    HomeMajorMonotone,
    NoteMajorMonotone,
    ReportsMajorMonotone,
    ProductsMajorMonotone,
    CirclePlusMajorMonotone,
    ImageMajorMonotone,
    FavoriteMajorTwotone
  } from "@shopify/polaris-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

export default class Sidebar extends React.Component {
  render() {
    return (
      <>
        <input type="checkbox" id="check" />
        <div class="ClosedsideBar">
          <label id="align-box" for="check">
            <div>
              <FontAwesomeIcon icon={faAlignJustify} color="white" />
            </div>
          </label>

          <div class=" insideDiv-Closed ">
            <div class="btn1">
              <Link style={{ textDecoration: "none" }} to="/imageoptimization">
              
                
<img src={require("../images/imageopti.png")} />
              </Link>
             
            </div>

            <div class="btn1">
           
                {" "}
                 <Link style={{ textDecoration: "none" }} to="/imageresize">
                {" "}
                <Jpegtopng />
              </Link>
              
        
            </div>

            <div class="btn1">
             <Link style={{ textDecoration: "none" }} to="/playlist">
                {" "}
                <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 24 25"
    >
      <path fill="url(#pattern0)" d="M0 0H23.106V25H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.00137 .00126)" xlinkHref="#image0"></use>
        </pattern>
        <image
          id="image0"
          width="732"
          height="792"
          xlinkHref="data:image/png;base64,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"
        ></image>
      </defs>
    </svg>
              </Link>
            </div>

            <div class="btn1">
             <Link style={{ textDecoration: "none" }} to="/playlist">
                {" "}
                
<img src={require("../images/zip.png")} />
              </Link>

            </div>

            <div class="btn1">
             <Link style={{ textDecoration: "none" }} to="/playlist">
                {" "}
                
<img src={require("../images/jpg.png")} />
              </Link>

            </div>

            <div class="btn1">
             <Link style={{ textDecoration: "none" }} to="/playlist">
                {" "}
                
<img src={require("../images/resize.png")} />
              </Link>

            </div>

          </div>
        </div>


        <div className="Nav">


          
                  

        <div className="_head">
        <input type="checkbox" id="check2" />
{/* Cross */}
        <label id="cross" for="check">
        <FontAwesomeIcon icon={faTimes} className="cross" />
  
        </label>
        </div>


        <div>
        <Icon
  source={HomeMajorMonotone} color="white" backdrop="false"  />
          <Link style={{ textDecoration: "none" }} to="/dashboard">
            <b className="links"> DASHBOARD </b>
          </Link>
        </div>
  
        

        <div>
        <img src={require("../images/imageopti.png")} />

          <Link style={{ textDecoration: "none" }} to="/imageoptimization">
            <b className="links"> ALL IN ONE </b>
          </Link>
        </div>


<div>
        <Icon
  source={NoteMajorMonotone} color="white" backdrop="false"  />
          <Link style={{ textDecoration: "none" }} to="/filename">
            <b className="links"> FILENAME </b>
          </Link>
        </div>

        <div>
        <img src={require("../images/zip.png")} />
          <Link style={{ textDecoration: "none" }} to="/imagecompression">
            <b className="links"> IMAGE COMPRESSION </b>
          </Link>
        </div>

        <div>
        <img src={require("../images/zip.png")} />
          <Link style={{ textDecoration: "none" }} to="/alttag">
            <b className="links"> ALT TAG </b>
          </Link>
        </div>

        <div>
        <img src={require("../images/jpg.png")} />
          <Link style={{ textDecoration: "none" }} to="/addwatermark">
            <b className="links"> ADD WATERMARK </b>
          </Link>
        </div>

        <div>
        <img src={require("../images/resize.png")} />
          <Link style={{ textDecoration: "none" }} to="/crop">
            <b className="links"> CROP IMAGES </b>
          </Link>
        </div>


        <div>
        <img src={require("../images/jpg.png")} />
          <a style={{ textDecoration: "none" }} href="">
            <b className="links"> WRITE REVIEW </b>
          </a>
        </div>

      </div>
        <div id="dull-bakground" />
      </>
    );
  }
}


