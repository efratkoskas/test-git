import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { FavProvider } from './pages/favoriteItemsContext/FavoriteItemsContext';
import { Provider } from 'react-redux'
import AppContent from './AppContent';
import store from './redux/Store';

function App() {
  return (
    <Provider store={store}>
      <FavProvider>
        <div className="App">
          <AppContent />
        </div>
      </FavProvider>
    </Provider>
  );
}

export default App;
