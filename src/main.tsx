import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/my-certificate-vault">
    <App />
  </BrowserRouter>
);
