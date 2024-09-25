import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { FavProvider } from './pages/favoriteItemsContext/FavoriteItemsContext';
import { Provider } from 'react-redux'
import AppContent from './AppContent';
import store from './redux/Store';
import { JWTExceptionProvider } from './utils/JWTExceptionContext';
import { useEffect } from 'react';

export interface Config {
  REACT_APP_BASE_URL: string;
}

function App() {
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/configs.json'); // Fetch from public directory
        const configData: Config = await response.json();
        localStorage.setItem('config', JSON.stringify(configData));
      } catch (error) {
        console.error('Error loading config:', error);
      }
    };

    fetchConfig();
  }, []);
  return (
    <Provider store={store}>
      <JWTExceptionProvider>
        <FavProvider>
          <div className="App">
            <AppContent />
          </div>
        </FavProvider>
      </JWTExceptionProvider>
    </Provider>
  );
}

export default App;
