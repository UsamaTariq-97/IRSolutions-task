import { Route, Routes } from "react-router-dom";
import NotFound from "./page/notFound";
import Login from "./page/Login";
import MainScreen from "./Main Screen/MainScreen";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home-page" element={<MainScreen />} />
      </Routes>
    </>
  );
}

export default App;
