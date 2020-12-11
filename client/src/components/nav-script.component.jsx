import React, { Component } from "react";
// import { render } from  "react-dom";
import '../tailwind.output.css';
import '../App.css';
import $ from "jquery";

class NavScript extends Component {
  // See https://tailwindcomponents.com/component/webpage-example-with-pure-tailwind-responsive-nav
  render() {

    return(
      <script type="text/javascript">
          $("#nav").on("click", function(e) {
            e.preventDefault();
            if($("#nav-items").hasClass("close")) {
              $("#nav-items").removeClass("close").addClass("open");
              $("#nav>i").removeClass("rotate-360-backwards fa-bars text-gray-600").addClass("rotate-360 fa-close text-white float-right");
            } else {
              $("#nav-items").removeClass("open").addClass("close");
              $("#nav>i").addClass("rotate-360-backwards fa-bars text-gray-600").removeClass("rotate-360 fa-close text-white float-right");
            }
          });
        </script>
    );
  }
}

export default NavScript;