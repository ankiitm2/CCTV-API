import "./App.css";
import Logo from "./assets/image.png";
import CameraListPage from "./pages/CameraListPage";

function App() {
  return (
    <>
      <div className="logo-wrapper">
        <img src={Logo} />
      </div>
      <CameraListPage />
    </>
  );
}

export default App;
