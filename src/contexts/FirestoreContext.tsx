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
}

interface Restaurant {
  [key: string]: any;
}

interface OfferBanner {
  [key: string]: any;
}

interface CartItem {
  [key: string]: any;
}

interface SpecialOffer {
  [key: string]: any;
}

interface ProfileData {
  [key: string]: any;
}

interface FirestoreContextProps {
  products: Product[];
  restaurants: Restaurant[];
  offerBanners: OfferBanner[];
  cartItems: CartItem[];
  specialOffers: SpecialOffer[];
  profileData: ProfileData[];
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
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [offerBanners, setOfferBanners] = useState<OfferBanner[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [profileData, setProfileData] = useState<ProfileData[]>([]);
  const [pendingRequests, setPendingRequests] = useState(0);
  const loading = pendingRequests > 0;

  const fetchCartItems = async () => {
    setPendingRequests(prev => prev + 1);
    try {
      const snapshot = await getDocs(collection(firestore(), 'cartItems'));
      setCartItems(
        snapshot.docs.map((document: any) => ({ id: document.id, ...document.data() })),
      );
    } finally {
      setPendingRequests(prev => prev - 1);
    }
  };

  const fetchSpecialOffers = async () => {
    setPendingRequests(prev => prev + 1);
    try {
      const snapshot = await getDocs(collection(firestore(), 'specialOffers'));
      setSpecialOffers(
        snapshot.docs.map((document: any) => ({ id: document.id, ...document.data() })),
      );
    } finally {
      setPendingRequests(prev => prev - 1);
    }
  };

  const fetchProfileData = async () => {
    setPendingRequests(prev => prev + 1);
    try {
      const snapshot = await getDocs(collection(firestore(), 'profileData'));
      setProfileData(
        snapshot.docs.map((document: any) => ({ id: document.id, ...document.data() })),
      );
    } finally {
      setPendingRequests(prev => prev - 1);
    }
  };
  const fetchProducts = async () => {
    setPendingRequests(prev => prev + 1);
    try {
      const snapshot = await getDocs(collection(firestore(), 'products'));
      setProducts(
        snapshot.docs.map((document: any) => ({ id: document.id, ...document.data() })),
      );
    } finally {
      setPendingRequests(prev => prev - 1);
    }
  };

  const fetchRestaurants = async () => {
    setPendingRequests(prev => prev + 1);
    try {
      const snapshot = await getDocs(collection(firestore(), 'restaurants'));
      setRestaurants(
        snapshot.docs.map((document: any) => ({ id: document.id, ...document.data() })),
      );
    } finally {
      setPendingRequests(prev => prev - 1);
    }
  };

  const fetchOfferBanners = async () => {
    setPendingRequests(prev => prev + 1);
    try {
      const snapshot = await getDocs(collection(firestore(), 'offerBanners'));
      setOfferBanners(
        snapshot.docs.map((document: any) => ({ id: document.id, ...document.data() })),
      );
    } finally {
      setPendingRequests(prev => prev - 1);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRestaurants();
    fetchOfferBanners();
    fetchCartItems();
    fetchSpecialOffers();
    fetchProfileData();
  }, []);

  // Fetch products by type (do not cache, fetch only when required)
  const fetchProductsByType = async (type: string): Promise<Product[]> => {
    setPendingRequests(prev => prev + 1);
    try {
      const q = query(
        collection(firestore(), 'products'),
        where('type', '==', type),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    } finally {
      setPendingRequests(prev => prev - 1);
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
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error('useFirestore must be used within a FirestoreProvider');
  }
  return context;
};
