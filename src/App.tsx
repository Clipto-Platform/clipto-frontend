import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Header } from './components/Header';
import { BountyPage } from './pages/Bounty';
import { OnboardingPage } from './pages/creator/Onboard';
import { HomePage } from './pages/Home';
import { NotFoundPage } from './pages/NotFound';
import { PurchasePage } from './pages/Purchase';
import { theme } from './styles/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route index element={<HomePage />} />
            <Route path="bounty" element={<BountyPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="creator/:creatorId" element={<PurchasePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
