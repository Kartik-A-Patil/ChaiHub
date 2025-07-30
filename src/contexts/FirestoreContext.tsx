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
  doc,
  getDoc,
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
interface FeaturedItem {
  [key: string]: any;
}
interface SpecialOffer {
  [key: string]: any;
}
interface QuickMenuItem {
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
  featuredItems: FeaturedItem[];
  specialOffers: SpecialOffer[];
  quickMenu: QuickMenuItem[];
  profileData: ProfileData[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  fetchRestaurants: () => Promise<void>;
  fetchOfferBanners: () => Promise<void>;
  fetchCartItems: () => Promise<void>;
  fetchFeaturedItems: () => Promise<void>;
  fetchSpecialOffers: () => Promise<void>;
  fetchQuickMenu: () => Promise<void>;
  fetchProfileData: () => Promise<void>;
  logAllData: () => void;
}

const FirestoreContext = createContext<FirestoreContextProps | undefined>(
  undefined,
);

export const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [offerBanners, setOfferBanners] = useState<OfferBanner[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [quickMenu, setQuickMenu] = useState<QuickMenuItem[]>([]);
  const [profileData, setProfileData] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(false);

  // Log all Firestore data to the console for testing
  const logAllData = () => {
    console.log('Products:', products);
    console.log('Restaurants:', restaurants);
    console.log('Offer Banners:', offerBanners);
    console.log('Cart Items:', cartItems);
    console.log('Featured Items:', featuredItems);
    console.log('Special Offers:', specialOffers);
    console.log('Quick Menu:', quickMenu);
    console.log('Profile Data:', profileData);
  };
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore(), 'cartItems'));
  setCartItems(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedItems = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore(), 'featuredItems'));
  setFeaturedItems(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecialOffers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore(), 'specialOffers'));
  setSpecialOffers(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
    } finally {
      setLoading(false);
    }
  };

  const fetchQuickMenu = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore(), 'quickMenu'));
  setQuickMenu(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore(), 'profileData'));
  setProfileData(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
    } finally {
      setLoading(false);
    }
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore(), 'products'));
  setProducts(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore(), 'restaurants'));
  setRestaurants(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
    } finally {
      setLoading(false);
    }
  };

  const fetchOfferBanners = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore(), 'offerBanners'));
      setOfferBanners(
        snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRestaurants();
    fetchOfferBanners();
    fetchCartItems();
    fetchFeaturedItems();
    fetchSpecialOffers();
    fetchQuickMenu();
    fetchProfileData();
  }, []);

  return (
    <FirestoreContext.Provider
      value={{
        products,
        restaurants,
        offerBanners,
        cartItems,
        featuredItems,
        specialOffers,
        quickMenu,
        profileData,
        loading,
        fetchProducts,
        fetchRestaurants,
        fetchOfferBanners,
        fetchCartItems,
        fetchFeaturedItems,
        fetchSpecialOffers,
        fetchQuickMenu,
        fetchProfileData,
        logAllData,
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
