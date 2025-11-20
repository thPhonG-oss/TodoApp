import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Home />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000, // có thể chỉnh lại thời gian
        }}
      />
    </>
  );
}

export default App;
