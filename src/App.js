import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./components";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
