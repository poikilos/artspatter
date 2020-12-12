

const loadCall = function () {
  // ^ https://stackoverflow.com/questions/53403233/how-to-use-javascript-in-react-component
  
  // See https://tailwindcomponents.com/component/webpage-example-with-pure-tailwind-responsive-nav
  // Convert from jQuery to vanilla JavaScript: https://dev.to/webdeasy/from-jquery-to-javascript-how-to-make-the-move-4ohi
  // result: nav.js
  document.querySelectorAll("#nav").on("click", function(e) {
    e.preventDefault();
    if(document.querySelectorAll("#nav-items").hasClass("close")) {
      console.log("opening items...");
      document.querySelectorAll("#nav-items").removeClass("close").addClass("open");
        
      //document.querySelectorAll("#nav-items").removeClass("rotate-360-backwards fa-bars text-gray-600").addClass("rotate-360 fa-close text-white float-right");
      document.querySelectorAll("#nav").removeClass("rotate-360-backwards fa-bars text-gray-600").addClass("rotate-360 fa-close text-white float-right");
      // ^ formerly "#nav>i"
    } else {
      console.log("closing items...");
      document.querySelectorAll("#nav-items").removeClass("open").addClass("close");

      document.querySelectorAll("#nav").addClass("rotate-360-backwards fa-bars text-gray-600").removeClass("rotate-360 fa-close text-white float-right");
      //document.querySelectorAll("#nav-items").addClass("rotate-360-backwards fa-bars text-gray-600").removeClass("rotate-360 fa-close text-white float-right");
      // ^ formerly "#nav>i"
    }
  });
};

const navjs = () => window.addEventListener('load', () => loadCall());

export default navjs;
