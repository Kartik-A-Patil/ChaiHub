import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import firestore, {
  getDocs,
  collection,
  query,
  where,
} from '@react-native-firebase/firestore';

interface Product {
  [key: string]: any;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  rating: number;
  reviews: number;
}

interface FirestoreContextProps {
  products: Product[];
  restaurants: any[];
  offerBanners: any[];
  cartItems: any[];
  specialOffers: any[];
  profileData: any[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  fetchProductsByType: (type: string) => Promise<Product[]>;
  fetchRestaurants: () => Promise<void>;
  fetchOfferBanners: () => Promise<void>;
  fetchCartItems: () => Promise<void>;
  fetchSpecialOffers: () => Promise<void>;
  fetchProfileData: () => Promise<void>;
}

const FirestoreContext = createContext<FirestoreContextProps | undefined>(
  undefined,
);

export const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [offerBanners, setOfferBanners] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [specialOffers, setSpecialOffers] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any[]>([]);
  const [pending, setPending] = useState(0);
  const loading = pending > 0;

  const fetchCollection = async (
    col: string,
    setter: (data: any[]) => void,
  ) => {
    setPending(p => p + 1);
    try {
      const snap = await getDocs(collection(firestore(), col));
      setter(snap.docs.map((d: any) => ({ id: d.id, ...d.data() })));
    } finally {
      setPending(p => p - 1);
    }
  };

  const fetchProducts = () => fetchCollection('products', setProducts);
  const fetchRestaurants = () => fetchCollection('restaurants', setRestaurants);
  const fetchOfferBanners = () =>
    fetchCollection('offerBanners', setOfferBanners);
  const fetchCartItems = () => fetchCollection('cartItems', setCartItems);
  const fetchSpecialOffers = () =>
    fetchCollection('specialOffers', setSpecialOffers);
  const fetchProfileData = () => fetchCollection('profileData', setProfileData);

  useEffect(() => {
    fetchProducts();
    fetchRestaurants();
    fetchOfferBanners();
    fetchCartItems();
    fetchSpecialOffers();
    fetchProfileData();
  }, []);

  const fetchProductsByType = async (type: string): Promise<Product[]> => {
    setPending(p => p + 1);
    try {
      const q = query(
        collection(firestore(), 'products'),
        where('type', '==', type),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
    } finally {
      setPending(p => p - 1);
    }
  };

  return (
    <FirestoreContext.Provider
      value={{
        products,
        restaurants,
        offerBanners,
        cartItems,
        specialOffers,
        profileData,
        loading,
        fetchProducts,
        fetchRestaurants,
        fetchOfferBanners,
        fetchCartItems,
        fetchSpecialOffers,
        fetchProfileData,
        fetchProductsByType,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  const ctx = useContext(FirestoreContext);
  if (!ctx)
    throw new Error('useFirestore must be used within a FirestoreProvider');
  return ctx;
};
