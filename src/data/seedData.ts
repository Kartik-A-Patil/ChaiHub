import Brownie from '../assets/brownie.jpeg';
import Coffee from '../assets/coffee.jpg';
import ColdCoffee from '../assets/cold_coffee.jpg';
import Cookie from '../assets/Cookie.jpg';
import LemonTea from '../assets/lemone_tea.jpeg';
import MasalaChai from '../assets/Masala_Chai.jpg';
import Pastry from '../assets/pastry.jpg';
import Potato from '../assets/Potato.jpeg';
import Roll from '../assets/roll.jpeg';
import Tea from '../assets/tea.jpg';
export const products = [
  {
    restaurantId: 'r1',
    name: 'Masala Chai',
    description: 'Spiced Indian tea',
    price: 50,
    image: MasalaChai,
    type: 'tea',
  },
  {
    restaurantId: 'r1',
    name: 'Samosa',
    description: 'Crispy potato snack',
    price: 30,
    image: Potato,
    type: 'snacks',
  },
  {
    restaurantId: 'r1',
    name: 'Ginger Tea',
    description: 'Refreshing ginger flavored tea',
    price: 55,
    image: Tea,
    type: 'tea',
  },
  {
    restaurantId: 'r1',
    name: 'Kesar Chai',
    description: 'Saffron infused chai',
    price: 70,
    image: Tea,
    type: 'tea',
  },
  // Coffee House
  {
    restaurantId: 'r2',
    name: 'Cappuccino',
    description: 'Classic Italian coffee',
    price: 80,
    image: Coffee,
    type: 'coffee',
  },
  {
    restaurantId: 'r2',
    name: 'Espresso',
    description: 'Strong and bold espresso shot',
    price: 60,
    image: Coffee,
    type: 'coffee',
  },
  {
    restaurantId: 'r2',
    name: 'Brownie',
    description: 'Chocolate fudge brownie',
    price: 40,
    image: Brownie,
    type: 'snacks',
  },
  // Snack Shack
  {
    restaurantId: 'r3',
    name: 'Veg Puff',
    description: 'Flaky pastry with veggie filling',
    price: 35,
    image: Pastry,
    type: 'snacks',
  },
  {
    restaurantId: 'r3',
    name: 'Paneer Roll',
    description: 'Paneer stuffed roll',
    price: 45,
    image: Roll,
    type: 'snacks',
  },
  {
    restaurantId: 'r3',
    name: 'Lemon Tea',
    description: 'Tangy lemon flavored tea',
    price: 40,
    image: LemonTea,
    type: 'tea',
  },

  {
    restaurantId: 'r4',
    name: 'Green Tea',
    description: 'Healthy green tea',
    price: 60,
    image: Tea,
    type: 'tea',
  },
  {
    restaurantId: 'r4',
    name: 'Cookies',
    description: 'Freshly baked cookies',
    price: 25,
    image: Cookie,
    type: 'snacks',
  },
  // Brew Bros
  {
    restaurantId: 'r5',
    name: 'Cold Brew',
    description: 'Chilled cold brew coffee',
    price: 90,
    image: ColdCoffee,
    type: 'coffee',
  },
  {
    restaurantId: 'r5',
    name: 'Mocha',
    description: 'Chocolate flavored coffee',
    price: 85,
    image: Coffee,
    type: 'coffee',
  },
  {
    restaurantId: 'r5',
    name: 'Banana Bread',
    description: 'Moist banana bread slice',
    price: 50,
    image: Pastry,
    type: 'snacks',
  },
  {
    restaurantId: 'r5',
    name: 'Hot Chocolate',
    description: 'Rich hot chocolate drink',
    price: 70,
    image: Coffee,
    type: 'others',
  },
];

export const restaurants = [
  {
    name: 'Chai Point',
    address: '123 Tea Street',
    image: MasalaChai, // Correct image for Chai Point
    distance: '0.5 km',
    rating: 4.5,
    reviews: 120,
    openUntil: '10:00 PM',
  },
  {
    name: 'Coffee House',
    address: '456 Coffee Ave',
    image: Coffee, // Correct image for Coffee House
    distance: '1.2 km',
    rating: 4.2,
    reviews: 98,
    openUntil: '11:00 PM',
  },
  {
    name: 'Snack Shack',
    address: '789 Snack Road',
    image: Pastry, // Correct image for Snack Shack
    distance: '2.0 km',
    rating: 4.0,
    reviews: 76,
    openUntil: '9:30 PM',
  },
  {
    name: 'Tea Time',
    address: '321 Leaf Lane',
    image: Tea, // Correct image for Tea Time
    distance: '2.5 km',
    rating: 4.3,
    reviews: 88,
    openUntil: '10:30 PM',
  },
  {
    name: 'Brew Bros',
    address: '654 Brew Blvd',
    image: ColdCoffee, // Correct image for Brew Bros
    distance: '3.1 km',
    rating: 4.6,
    reviews: 110,
    openUntil: '12:00 AM',
  },
];
