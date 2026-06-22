/* =========================================================
   FoodHub — Mock Data Layer
   In production this is replaced by fetch() calls to the
   ASP.NET Core Web API (see /backend). Kept here so every
   screen is fully interactive without a live server.
   ========================================================= */

const FH_DATA = {

  categories: [
    { id:'pizza',     name:'Pizza',      icon:'fa-pizza-slice' },
    { id:'burgers',   name:'Burgers',    icon:'fa-burger' },
    { id:'sushi',     name:'Sushi',      icon:'fa-fish' },
    { id:'arabic',    name:'Arabic',     icon:'fa-bowl-food' },
    { id:'desserts',  name:'Desserts',   icon:'fa-ice-cream' },
    { id:'healthy',   name:'Healthy',    icon:'fa-leaf' },
    { id:'asian',     name:'Asian',      icon:'fa-pepper-hot' },
    { id:'breakfast', name:'Breakfast',  icon:'fa-mug-saucer' },
  ],

  restaurants: [
    {
      id:'r1', name:'Bella Napoli Pizzeria', cuisine:'Italian · Pizza', categoryIds:['pizza'],
      rating:4.8, reviewsCount:642, deliveryTime:'25-35 min', deliveryFee:2.5, minOrder:8, isOpen:true, promo:'30% OFF',
      image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r2', name:'Smokehouse Burger Co.', cuisine:'American · Burgers', categoryIds:['burgers'],
      rating:4.6, reviewsCount:418, deliveryTime:'20-30 min', deliveryFee:1.99, minOrder:6, isOpen:true,
      image:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r3', name:'Sakura Sushi House', cuisine:'Japanese · Sushi', categoryIds:['sushi','asian'],
      rating:4.9, reviewsCount:301, deliveryTime:'30-40 min', deliveryFee:3.5, minOrder:10, isOpen:true, promo:'Free Delivery',
      image:'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r4', name:'Al Rawda Damascus Kitchen', cuisine:'Levantine · Arabic', categoryIds:['arabic'],
      rating:4.7, reviewsCount:889, deliveryTime:'25-35 min', deliveryFee:0, minOrder:7, isOpen:true, promo:'Free Delivery',
      image:'https://images.unsplash.com/photo-1601315379734-9443ed3b3c8d?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r5', name:'Green Bowl Co.', cuisine:'Healthy · Salads', categoryIds:['healthy'],
      rating:4.5, reviewsCount:212, deliveryTime:'15-25 min', deliveryFee:1.5, minOrder:5, isOpen:true,
      image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r6', name:'Golden Dragon Wok', cuisine:'Chinese · Asian', categoryIds:['asian'],
      rating:4.4, reviewsCount:356, deliveryTime:'30-45 min', deliveryFee:2.0, minOrder:6, isOpen:false,
      image:'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r7', name:'Sweet Crumbs Bakery', cuisine:'Desserts · Bakery', categoryIds:['desserts'],
      rating:4.9, reviewsCount:530, deliveryTime:'20-30 min', deliveryFee:1.99, minOrder:4, isOpen:true, promo:'20% OFF',
      image:'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r8', name:'Sunrise Breakfast Club', cuisine:'Breakfast · Cafe', categoryIds:['breakfast'],
      rating:4.6, reviewsCount:178, deliveryTime:'15-25 min', deliveryFee:1.5, minOrder:5, isOpen:true,
      image:'https://images.unsplash.com/photo-1533920379810-6bedac961555?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80'
    },
  ],

  menus: {
    r1: {
      tabs:['Pizza','Pasta','Sides','Drinks'],
      items:[
        { id:'m1', tab:'Pizza', name:'Margherita Classica', desc:'San Marzano tomato, fior di latte mozzarella, fresh basil', price:9.5, img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80' },
        { id:'m2', tab:'Pizza', name:'Quattro Formaggi', desc:'Mozzarella, gorgonzola, parmesan, provolone', price:11.0, img:'https://images.unsplash.com/photo-1593560708920-61b98ae243f7?auto=format&fit=crop&w=400&q=80' },
        { id:'m3', tab:'Pizza', name:'Spicy Diavola', desc:'Spicy salami, chili flakes, mozzarella, tomato', price:11.5, img:'https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&w=400&q=80' },
        { id:'m4', tab:'Pasta', name:'Spaghetti Carbonara', desc:'Guanciale, egg yolk, pecorino, black pepper', price:10.5, img:'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80' },
        { id:'m5', tab:'Sides', name:'Garlic Focaccia', desc:'Baked daily, rosemary & sea salt', price:4.5, img:'https://images.unsplash.com/photo-1619985632461-f33748a05f44?auto=format&fit=crop&w=400&q=80' },
        { id:'m6', tab:'Drinks', name:'San Pellegrino', desc:'Sparkling water 330ml', price:2.0, img:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    default: {
      tabs:['Popular','Mains','Sides','Drinks'],
      items:[
        { id:'d1', tab:'Popular', name:'Chef\'s Special Platter', desc:'A signature dish crafted with seasonal ingredients', price:12.0, img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80' },
        { id:'d2', tab:'Mains', name:'House Special Bowl', desc:'Generous portion, served with a side of your choice', price:9.5, img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80' },
        { id:'d3', tab:'Mains', name:'Grilled Selection', desc:'Char-grilled to order, served hot', price:10.0, img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
        { id:'d4', tab:'Sides', name:'Crispy Fries', desc:'Hand-cut, double-fried, sea salt', price:3.5, img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' },
        { id:'d5', tab:'Drinks', name:'Fresh Lemonade', desc:'Cold-pressed, no added sugar', price:2.5, img:'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80' },
      ]
    }
  },

  reviews: [
    { name:'Mona Hassan', role:'Cairo, EG', rating:5, text:'Delivery was faster than the estimate and the food was still hot. The app makes reordering my favorites incredibly easy.' },
    { name:'Yusuf Al-Amin', role:'Riyadh, SA', rating:5, text:'Tracking the rider on the map and getting live status updates removed all the guesswork from ordering dinner.' },
    { name:'Sara Naguib', role:'Giza, EG', rating:4, text:'Great selection of restaurants near me and the coupon codes actually worked at checkout, which is rare.' },
  ],

  orders: [
    { id:'FH-10482', restaurant:'Bella Napoli Pizzeria', date:'Jun 18, 2026', total:24.50, status:'Delivered', items:3 },
    { id:'FH-10410', restaurant:'Smokehouse Burger Co.', date:'Jun 12, 2026', total:18.90, status:'Delivered', items:2 },
    { id:'FH-10355', restaurant:'Sakura Sushi House', date:'Jun 03, 2026', total:41.20, status:'Cancelled', items:5 },
    { id:'FH-10299', restaurant:'Al Rawda Damascus Kitchen', date:'May 27, 2026', total:15.75, status:'Delivered', items:2 },
  ],

  addresses: [
    { id:'a1', label:'Home', detail:'12 Tahrir Street, Apt 4B, Dokki, Giza', isDefault:true },
    { id:'a2', label:'Work', detail:'Smart Village, Building C3, KM 28 Cairo-Alex Rd', isDefault:false },
  ],

  getMenu(restaurantId){ return this.menus[restaurantId] || this.menus.default; },
  getRestaurant(id){ return this.restaurants.find(r => r.id === id); }
};