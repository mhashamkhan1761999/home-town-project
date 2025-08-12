import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import Athletes from './pages/Athletes.jsx'
import Faq from './pages/faq.jsx'
import ExploreAthletes from './pages/ExploreAthletes.jsx'
import OurTeam from './pages/OurTeam.jsx'
import StoreFront from './pages/StoreFront.jsx'
import AthletesSignUp from './pages/AthletesSignUp.jsx'
import MasterLayout from './masterlayout/index.jsx'
import NilService from './adminpages/NilService.jsx'
import Profile from './adminpages/Profile.jsx'
import Subscription from './adminpages/Subscription.jsx'
import Settings from './adminpages/Settings.jsx'
import AdminHome from './adminpages/index.jsx'
import Reviews from './adminpages/Reviews.jsx'
import Graphic from './adminpages/graphic/index.jsx'
import Dashboard from './adminpages/dashboard.jsx/index.jsx'
import Policy from './pages/Policy.jsx'
import TwelveDayCounter from './components/TwelveDayCounter.jsx'
import Login from './pages/Login.jsx'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/ScrollToTop.jsx' // adjust path if needed

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cart from './pages/cart.jsx'
import Checkout from './pages/checkout.jsx'
import { store, persistor } from './redux/index.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThankYou from './pages/thank-you.jsx'
import LoginPage from './pages/LoginPage.jsx'
import MySubscription from './adminpages/MySubscription.jsx'
import ForntDetail from './pages/ForntDetail.jsx'
import MyProducts from './adminpages/MyProducts.jsx'
import Bundles from './adminpages/Bundles.jsx'
import SuperAdminLayout from './super-admin-layout/index.jsx'
import SuperAdminHome from './super-admin-pages/index.jsx'
import SuperAdminDashboard from './super-admin-pages/dashboard.jsx/index.jsx'
import SuperAdminMyProducts from './super-admin-pages/MyProducts.jsx'
export const queryClient = new QueryClient();


const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<><Outlet /></>}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="athletes" element={<Athletes />} />
          <Route path="faq" element={<Faq />} />
          <Route path="explore-athletes" element={<ExploreAthletes />} />
          <Route path="our-team" element={<OurTeam />} />
          <Route path="store-front" element={<StoreFront />} />
          <Route path="store-front/:id" element={<ForntDetail />} />
          <Route path="athlete-signup" element={<AthletesSignUp />} />
          <Route path="policy" element={<Policy />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        {/* <Route path='/athlete/dashboard' element={<TwelveDayCounter />} /> */}

        <Route path='athlete' element={<MasterLayout />} >
          <Route path='home' element={<AdminHome />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='nil-service' element={<NilService />} />
          <Route path='my-products' element={<MyProducts />} />
          <Route path='profile' element={<Profile />} />
          <Route path='subscription' element={<Subscription />} />
          <Route path='bundles' element={<Bundles />} />
          <Route path='my-subscription' element={<MySubscription />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='graphic' element={<Graphic />} />
          <Route path='settings' element={<Settings />} />
        </Route>

        <Route path='admin' element={<SuperAdminLayout />}>
          <Route  path='home' element={<SuperAdminHome />} />
          <Route path='dashboard' element={<SuperAdminDashboard />} />
          <Route path='my-products' element={<SuperAdminMyProducts />} />
        </Route>
      </Route>
    </Routes>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ScrollToTop />
            <AllRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)



