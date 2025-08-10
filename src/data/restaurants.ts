// Restaurant and Product data structures
import Coffee from '../assets/coffee.jpg';
import ColdCoffee from '../assets/cold_coffee.jpg';
import Cookie from '../assets/Cookie.jpg';
import LemonTea from '../assets/lemone_tea.jpeg';
import MasalaChai from '../assets/Masala_Chai.jpg';
import Pastry from '../assets/pastry.jpg';
import Potato from '../assets/Potato.jpg';
import Roll from '../assets/roll.jpg';
import Tea from '../assets/tea.jpg';
import Resto from '../assets/restaurant4.jpg';

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  image: string;
  distance: string;
  rating: number;
  reviews: number;
  openUntil: string;
};

export type Product = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'coffee' | 'tea' | 'snacks' | 'others';
};

// Example data
export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Chai Point',
    address: '123 Tea Street',
    image: Resto, // Using MasalaChai image as a placeholder
    distance: '0.5 km',
    rating: 4.5,
    reviews: 120,
    openUntil: '10:00 PM',
  },
  {
    id: 'r2',
    name: 'Coffee House',
    address: '456 Coffee Ave',
    image: Resto, // Using Coffee image as a placeholder
    distance: '1.2 km',
    rating: 4.2,
    reviews: 98,
    openUntil: '11:00 PM',
  },
  {
    id: 'r3',
    name: 'Snack Shack',
    address: '789 Snack Road',
    image: Resto, // Using Pastry image as a placeholder
    distance: '2.0 km',
    rating: 4.0,
    reviews: 76,
    openUntil: '9:30 PM',
  },
  {
    id: 'r4',
    name: 'Tea Time',
    address: '321 Leaf Lane',
    image: Resto, // Using Tea image as a placeholder
    distance: '2.5 km',
    rating: 4.3,
    reviews: 88,
    openUntil: '10:30 PM',
  },
  {
    id: 'r5',
    name: 'Brew Bros',
    address: '654 Brew Blvd',
    image: Resto, // Using ColdCoffee image as a placeholder
    distance: '3.1 km',
    rating: 4.6,
    reviews: 110,
    openUntil: '12:00 AM',
  },
];

export const products: Product[] = [
  // Chai Point
  {
    id: 'p1',
    restaurantId: 'r1',
    name: 'Masala Chai',
    description: 'Spiced Indian tea',
    price: 4.99,
    image: MasalaChai,
    type: 'tea',
  },
  {
    id: 'p2',
    restaurantId: 'r1',
    name: 'Samosa',
    description: 'Crispy potato snack',
    price: 3.49,
    image: Potato,
    type: 'snacks',
  },
  {
    id: 'p3',
    restaurantId: 'r1',
    name: 'Ginger Tea',
    description: 'Refreshing ginger flavored tea',
    price: 5.49,
    image: Tea,
    type: 'tea',
  },
  {
    id: 'p4',
    restaurantId: 'r1',
    name: 'Kesar Chai',
    description: 'Saffron infused chai',
    price: 6.99,
    image: Tea,
    type: 'tea',
  },
  // Coffee House
  {
    id: 'p5',
    restaurantId: 'r2',
    name: 'Cappuccino',
    description: 'Classic Italian coffee',
    price: 7.99,
    image: Coffee,
    type: 'coffee',
  },
  {
    id: 'p6',
    restaurantId: 'r2',
    name: 'Espresso',
    description: 'Strong and bold espresso shot',
    price: 5.99,
    image: Coffee,
    type: 'coffee',
  },
  // Snack Shack
  {
    id: 'p8',
    restaurantId: 'r3',
    name: 'Veg Puff',
    description: 'Flaky pastry with veggie filling',
    price: 3.99,
    image: Pastry,
    type: 'snacks',
  },
  {
    id: 'p9',
    restaurantId: 'r3',
    name: 'Paneer Roll',
    description: 'Paneer stuffed roll',
    price: 4.99,
    image: Roll,
    type: 'snacks',
  },
  {
    id: 'p10',
    restaurantId: 'r3',
    name: 'Lemon Tea',
    description: 'Tangy lemon flavored tea',
    price: 4.49,
    image: LemonTea,
    type: 'tea',
  },

  {
    id: 'p11',
    restaurantId: 'r4',
    name: 'Green Tea',
    description: 'Healthy green tea',
    price: 5.99,
    image: Tea,
    type: 'tea',
  },
  {
    id: 'p12',
    restaurantId: 'r4',
    name: 'Cookies',
    description: 'Freshly baked cookies',
    price: 2.99,
    image: Cookie,
    type: 'snacks',
  },
  // Brew Bros
  {
    id: 'p13',
    restaurantId: 'r5',
    name: 'Cold Brew',
    description: 'Chilled cold brew coffee',
    price: 8.99,
    image: ColdCoffee,
    type: 'coffee',
  },
  {
    id: 'p14',
    restaurantId: 'r5',
    name: 'Mocha',
    description: 'Chocolate flavored coffee',
    price: 8.49,
    image: Coffee,
    type: 'coffee',
  },
  {
    id: 'p15',
    restaurantId: 'r5',
    name: 'Banana Bread',
    description: 'Moist banana bread slice',
    price: 4.99,
    image: Pastry,
    type: 'snacks',
  },
  {
    id: 'p16',
    restaurantId: 'r5',
    name: 'Hot Chocolate',
    description: 'Rich hot chocolate drink',
    price: 6.99,
    image: Coffee,
    type: 'others',
  },
];
