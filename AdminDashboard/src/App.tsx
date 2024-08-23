import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import AddProduct from './pages/Form/AddProduct';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import store from './store/store';
import EditProduct from './pages/Form/EditProduct';
import Tables from './pages/Tables';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (

      <Provider store={store}>
      <Routes>
        <Route
          index
          element={
            <DefaultLayout>
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
            </DefaultLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DefaultLayout>
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
            </DefaultLayout>
          }
        />
        <Route
          path="/forms/addProduct"
          element={
            <DefaultLayout>
            <>
              <PageTitle title="Form addProduct | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddProduct />
            </>
            </DefaultLayout>
            
          }
        />

         <Route
          path="/forms/editProduct"
          element={
            <DefaultLayout>
            <>
              <PageTitle title="Form addProduct | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EditProduct />
            </>
            </DefaultLayout>           
          }
        />
        <Route
          path="/tables"
          element={
            <DefaultLayout>
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
            </DefaultLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DefaultLayout>
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
            </DefaultLayout>
          }
        />
        <Route
          path="/chart"
          element={
            <DefaultLayout>
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
            </DefaultLayout>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <DefaultLayout>
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
            </DefaultLayout>
          }
        />

        {/* from here our project route used login route*/}
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
      </Routes>
      </Provider>
  );
}

export default App;
