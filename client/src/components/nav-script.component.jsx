import React, { Component } from "react";
// import { render } from  "react-dom";
import '../tailwind.output.css';
// import '../App.css';
// import $ from "jquery";

class NavScript extends Component {
  // See https://tailwindcomponents.com/component/webpage-example-with-pure-tailwind-responsive-nav
  // Convert from jQuery to vanilla JavaScript: https://dev.to/webdeasy/from-jquery-to-javascript-how-to-make-the-move-4ohi
  // See nav.js
/*
  componentDidMount() {
    return(
      <script type="text/javascript">
          document.querySelectorAll("#nav").on("click", function(e) {
            e.preventDefault();
            if(document.querySelectorAll("#nav-items").hasClass("close")) {
              document.querySelectorAll("#nav-items").removeClass("close").addClass("open");
                
              document.querySelectorAll("#nav-items").removeClass("rotate-360-backwards fa-bars text-gray-600").addClass("rotate-360 fa-close text-white float-right");
              document.querySelectorAll("#nav").removeClass("rotate-360-backwards fa-bars text-gray-600").addClass("rotate-360 fa-close text-white float-right");
              // ^ formerly "#nav>i"
            } else {
              document.querySelectorAll("#nav-items").removeClass("open").addClass("close");

              document.querySelectorAll("#nav").addClass("rotate-360-backwards fa-bars text-gray-600").removeClass("rotate-360 fa-close text-white float-right");
              document.querySelectorAll("#nav-items").addClass("rotate-360-backwards fa-bars text-gray-600").removeClass("rotate-360 fa-close text-white float-right");
              // ^ formerly "#nav>i"
            }
          });
        </script>
    );
  }
*/
}

export default NavScript;