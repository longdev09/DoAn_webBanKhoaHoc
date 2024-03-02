import LayoutMentor from "./layout/LayoutMentor";
import LayoutDefaut from "./layout/LayoutDefaut";
import LayoutAdmin from "./layout/LayoutAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, publicRoutesMentor, publicRoutesAdmin } from "~/routes";
import { Fragment } from "react";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = route.layout === null ? Fragment : LayoutDefaut;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {publicRoutesMentor.map((route, index) => {
            let Layout = route.layout === null ? Fragment : LayoutMentor;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {publicRoutesAdmin.map((route, index) => {
            let Layout = route.layout === null ? Fragment : LayoutAdmin;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
