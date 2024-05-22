import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FullRegister from "./components/FullRegister";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";
import Register from "./pages/Register";
import LogIn from "../src/pages/LogIn";
import Post from "./pages/Post";
import ToDo from "./pages/ToDo";
import LayoutHome from "./components/LayoutHome";
import LayoutIndex from "./components/LayoutIndex";
import ViewPost from "./components/ViewPost";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutIndex />}>
            <Route path="/" element={<LogIn />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/LogIn" element={<LogIn />} />
          </Route>
          <Route path="/FullRegister" element={<FullRegister />} />
          <Route element={<LayoutHome />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/ToDo" element={<ToDo />} />
            <Route path="/Post" element={<Post />} />
            <Route path="/Post/:id" element={<ViewPost />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
