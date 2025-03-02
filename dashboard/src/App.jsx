import { RouterProvider } from "react-router-dom";
import { MainContextProvider } from "./context/MainContext";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  return (
    <>
      <MainContextProvider>
        <RouterProvider router={AllRoutes} />
      </MainContextProvider>
    </>
  );
}

export default App;
