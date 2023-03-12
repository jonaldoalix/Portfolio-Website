import "./Top.scss";

export default function Top() {
  function TopEvent() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  // When the user scrolls down 20px from the top of the document, show the button
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById("topButton").style.visibility = "visible";
    } else {
      document.getElementById("topButton").style.visibility = "hidden";
    }
  }
  window.onscroll = function () {
    scrollFunction();
  };
  window.onload = function () {
    scrollFunction();
  };

  return (
    <button onClick={TopEvent} id="topButton" title="Go to top">
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}
