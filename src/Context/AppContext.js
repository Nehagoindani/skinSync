import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [state, setState] = useState('');
  const [loader, setLoader] = useState('');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
   const [cart, setCart] = useState([]);
   const [wishlist, setWishlist] = useState([]);


  useEffect(() => {
    async function fetchStoredValues() {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken !== null) {
          setToken(JSON.parse(storedToken));
        }
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      }
    }

    fetchStoredValues();
  }, []);

  useEffect(() => {
    async function saveValuesToStorage() {
      try {
        await AsyncStorage.setItem('token', JSON.stringify(token));
      } catch (error) {
        console.log('Error saving data to AsyncStorage:', error);
      }
    }

    saveValuesToStorage();
  }, [token]);

  const contextValues = useMemo(
    () => ({
      state,
      setState,
      loader,
      setLoader,
      token,
      setToken,
      user,
      setUser,
      cart,
      setCart,
      wishlist,
      setWishlist
      
    }),
    [
      state,
      setState,
      loader,
      setLoader,
      token,
      setToken,
      user,
      setUser,
      cart,
      setCart, 
      wishlist,
      setWishlist,
     
    ],
  );

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
