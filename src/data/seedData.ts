export const products = [
  { name: 'Masala Chai', price: 2.5, image: 'Masala_Chai.jpg' },
  { name: 'Cold Coffee', price: 3.0, image: 'cold_coffee.jpg' },
  { name: 'Pastry', price: 4.0, image: 'pastry.jpg' },
  { name: 'Brownie', price: 3.5, image: 'brownie.jpeg' },
  { name: 'Roll', price: 2.0, image: 'roll.jpeg' },
];

export const restaurants = [
  {
    name: 'The Chai Corner',
    address: '123 Main St, Anytown, USA',
    image: 'Resto.webp',
    rating: 4.5,
    products: [products[0], products[1]],
  },
  {
    name: 'Cafe Mocha',
    address: '456 Oak Ave, Anytown, USA',
    image: 'Resto.webp',
    rating: 4.2,
    products: [products[2], products[3]],
  },
  {
    name: 'Quick Bites',
    address: '789 Pine Ln, Anytown, USA',
    image: 'Resto.webp',
    rating: 4.0,
    products: [products[4]],
  },
];

export const offerBanners = [
  { title: 'Get 20% off on all orders!', image: 'tea.jpg' },
  { title: 'Free delivery on orders over $20', image: 'coffee.jpg' },
  { title: 'Buy one get one free on all pastries', image: 'pastry.jpg' },
];