// src/utils/imageMap.ts
// Centralized static image map for local assets

const imageMap: { [key: string]: any } = {
  'brownie.jpeg': require('../assets/brownie.jpeg'),
  'coffee.jpg': require('../assets/coffee.jpg'),
  'cold_coffee.jpg': require('../assets/cold_coffee.jpg'),
  'Cookie.jpg': require('../assets/Cookie.jpg'),
  'lemone_tea.jpeg': require('../assets/lemone_tea.jpeg'),
  'Masala_Chai.jpg': require('../assets/Masala_Chai.jpg'),
  'pastry.jpg': require('../assets/pastry.jpg'),
  'Potato.jpeg': require('../assets/Potato.jpeg'),
  'Resto.webp': require('../assets/Resto.webp'),
  'roll.jpeg': require('../assets/roll.jpeg'),
  'tea.jpg': require('../assets/tea.jpg'),
};

export default imageMap;
