import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { FavProvider } from './pages/favoriteItemsContext/FavoriteItemsContext';
import { Provider } from 'react-redux'
import AppContent from './AppContent';
import store from './redux/Store';
import { JWTExceptionProvider } from './utils/JWTExceptionContext';

function App() {
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
