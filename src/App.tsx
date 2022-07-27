import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { BottomBar } from './components/BottomBar/BottomBar';
import { Header } from './components/Header/Header';
import { BookingPage } from './pages/Booking/Booking';
import { ExplorePage } from './pages/Explore/Explore';
import { HomePage } from './pages/Home/Home';
import { NotFoundPage } from './pages/NotFound/NotFound';
import { OnboardingPage } from './pages/Onboard/Onboard';
import { OnboardProfilePage } from './pages/OnboardProfile/OnboardProfile';
import { OrdersPage } from './pages/Orders/Orders';
import { SelectedOrderPage } from './pages/SelectedOrder/SelectedOrder';
import { theme } from './styles/theme';
import { Provider as GraphQLProvider } from 'urql';
import { graphInstance } from './api/lens';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
import SocialSignInModal from './components/SocialSignInModal';
import LensSimplePostModal from './components/LensSimplePostModal';

function App() {
  const user = useSelector((state: any) => state.user);
  return (
    <GraphQLProvider value={graphInstance}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route index element={<HomePage />} />
              <Route path="explore" element={<ExplorePage />} />
              {/* <Route path="bounty" element={<BountyPage />} /> */}
              <Route path="onboarding/profile" element={user ? <OnboardProfilePage /> : <Navigate to="/" />} />
              {/* <Route path="bountyDone" element={<BountyDone />} /> */}
              {/* <Route path="invitation" element={<InvitationPage />} /> */}
              {/* <Route path="mint" element={<MintPage />} /> */}
              <Route path="onboarding" element={user ? <OnboardingPage /> : <Navigate to="/" />} />
              <Route path="orders" element={user ? <OrdersPage /> : <Navigate to="/" />} />
              <Route
                path="orders/:creator/:requestId/:version"
                element={user ? <SelectedOrderPage /> : <Navigate to="/" />}
              />
              <Route path="creator/:creatorId" element={<BookingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <BottomBar />
          </BrowserRouter>
          {/* Modals */}
          <ToastContainer
            position="bottom-center"
            theme="dark"
            limit={1}
            newestOnTop={false}
            closeOnClick
            autoClose={5000}
            rtl={false}
            pauseOnFocusLoss
            draggable
            transition={Zoom}
            hideProgressBar={true}
          />
          <SocialSignInModal />
          <LensSimplePostModal />
        </ThemeProvider>
      </Web3ReactProvider>
    </GraphQLProvider>
  );
}

export default App;
