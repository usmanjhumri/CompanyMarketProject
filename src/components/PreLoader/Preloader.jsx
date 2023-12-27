import PreLoader from "../../assets/Loader.gif";
import "./Preloader.css";
function Preloader() {
  return (
    <div className="preloader-container">
      <img src={PreLoader} alt="Loading" />
    </div>
  );
}

export default Preloader;
