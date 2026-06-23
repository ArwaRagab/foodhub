/* =========================================================
   وجبة — طبقة البيانات التجريبية (عربي)
   في بيئة الإنتاج تُستبدل هذه البيانات بطلبات fetch() حقيقية
   إلى واجهة برمجة ASP.NET Core الموجودة في مجلد /backend
   ========================================================= */

const FH_DATA = {

  categories: [
    { id:'pizza',     name:'بيتزا',     icon:'fa-pizza-slice' },
    { id:'burgers',   name:'برجر',      icon:'fa-burger' },
    { id:'sushi',     name:'سوشي',      icon:'fa-fish' },
    { id:'arabic',    name:'مأكولات عربية', icon:'fa-bowl-food' },
    { id:'desserts',  name:'حلويات',    icon:'fa-ice-cream' },
    { id:'healthy',   name:'أكل صحي',   icon:'fa-leaf' },
    { id:'asian',     name:'آسيوي',     icon:'fa-pepper-hot' },
    { id:'breakfast', name:'فطور',      icon:'fa-mug-saucer' },
  ],

  restaurants: [
    {
      id:'r1', name:'بيلا نابولي للبيتزا', cuisine:'إيطالي · بيتزا', categoryIds:['pizza'],
      rating:4.8, reviewsCount:642, deliveryTime:'25-35 دقيقة', deliveryFee:12.5, minOrder:40, isOpen:true, promo:'خصم 30%',
      image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r2', name:'سموك هاوس للبرجر', cuisine:'أمريكي · برجر', categoryIds:['burgers'],
      rating:4.6, reviewsCount:418, deliveryTime:'20-30 دقيقة', deliveryFee:10, minOrder:30, isOpen:true,
      image:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r3', name:'ساكورا للسوشي', cuisine:'ياباني · سوشي', categoryIds:['sushi','asian'],
      rating:4.9, reviewsCount:301, deliveryTime:'30-40 دقيقة', deliveryFee:17.5, minOrder:50, isOpen:true, promo:'توصيل مجاني',
      image:'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r4', name:'مطبخ الروضة الدمشقي', cuisine:'شامي · مأكولات عربية', categoryIds:['arabic'],
      rating:4.7, reviewsCount:889, deliveryTime:'25-35 دقيقة', deliveryFee:0, minOrder:35, isOpen:true, promo:'توصيل مجاني',
      image:'https://images.unsplash.com/photo-1601315379734-9443ed3b3c8d?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r5', name:'جرين بول للأكل الصحي', cuisine:'صحي · سلطات', categoryIds:['healthy'],
      rating:4.5, reviewsCount:212, deliveryTime:'15-25 دقيقة', deliveryFee:7.5, minOrder:25, isOpen:true,
      image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r6', name:'التنين الذهبي', cuisine:'صيني · آسيوي', categoryIds:['asian'],
      rating:4.4, reviewsCount:356, deliveryTime:'30-45 دقيقة', deliveryFee:10, minOrder:30, isOpen:false,
      image:'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r7', name:'سويت كرامبز للحلويات', cuisine:'حلويات · مخبوزات', categoryIds:['desserts'],
      rating:4.9, reviewsCount:530, deliveryTime:'20-30 دقيقة', deliveryFee:10, minOrder:20, isOpen:true, promo:'خصم 20%',
      image:'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=200&q=80'
    },
    {
      id:'r8', name:'نادي صن رايز للفطور', cuisine:'فطور · كافيه', categoryIds:['breakfast'],
      rating:4.6, reviewsCount:178, deliveryTime:'15-25 دقيقة', deliveryFee:7.5, minOrder:25, isOpen:true,
      image:'https://images.unsplash.com/photo-1533920379810-6bedac961555?auto=format&fit=crop&w=900&q=80',
      logo:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80'
    },
  ],

  menus: {
    r1: {
      tabs:['بيتزا','باستا','أطباق جانبية','مشروبات'],
      items:[
        { id:'m1', tab:'بيتزا', name:'مارجريتا كلاسيك', desc:'صلصة طماطم سان مارزانو، جبنة موزاريلا، ريحان طازج', price:47.5, img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80' },
        { id:'m2', tab:'بيتزا', name:'كواترو فورماجي', desc:'أربعة أنواع جبن: موزاريلا، جورجونزولا، بارميزان، بروفولوني', price:55, img:'https://images.unsplash.com/photo-1593560708920-61b98ae243f7?auto=format&fit=crop&w=400&q=80' },
        { id:'m3', tab:'بيتزا', name:'ديافولا الحارة', desc:'سلامي حار، فليفلة مجروشة، موزاريلا، طماطم', price:57.5, img:'https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&w=400&q=80' },
        { id:'m4', tab:'باستا', name:'باستا كاربونارا', desc:'جوانشاله، صفار بيض، جبنة بيكورينو، فلفل أسود', price:52.5, img:'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&q=80' },
        { id:'m5', tab:'أطباق جانبية', name:'فوكاتشا بالثوم', desc:'تُخبز يوميًا بإكليل الجبل وملح البحر', price:22.5, img:'https://images.unsplash.com/photo-1619985632461-f33748a05f44?auto=format&fit=crop&w=400&q=80' },
        { id:'m6', tab:'مشروبات', name:'سان بيليجرينو', desc:'مياه غازية 330 مل', price:10, img:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    default: {
      tabs:['الأكثر طلبًا','أطباق رئيسية','أطباق جانبية','مشروبات'],
      items:[
        { id:'d1', tab:'الأكثر طلبًا', name:'طبق الشيف الخاص', desc:'تشكيلة مميزة من الشيف بمكونات موسمية مختارة بعناية', price:60, img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80' },
        { id:'d2', tab:'أطباق رئيسية', name:'وعاء البيت الخاص', desc:'حصة كبيرة، تُقدم مع إضافة من اختيارك', price:47.5, img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80' },
        { id:'d3', tab:'أطباق رئيسية', name:'تشكيلة مشاوي', desc:'تُشوى على الفحم مباشرة وتُقدم سريعًا وهي سخنة', price:50, img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
        { id:'d4', tab:'أطباق جانبية', name:'بطاطس مقرمشة', desc:'تُقطّع يدويًا وتُقلى مرتين مع ملح البحر', price:17.5, img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' },
        { id:'d5', tab:'مشروبات', name:'ليموناضة طازجة', desc:'معصورة على البارد وبدون أي سكر مضاف', price:12.5, img:'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80' },
      ]
    }
  },

  reviews: [
    { name:'منى حسن', role:'القاهرة، مصر', rating:5, text:'التوصيل كان أسرع من المتوقع والأكل وصل سخن. التطبيق بيسهّل إعادة طلب حاجاتي المفضلة بشكل رائع.' },
    { name:'يوسف الأمين', role:'الرياض، السعودية', rating:5, text:'تتبع عامل التوصيل على الخريطة ومتابعة حالة الطلب لحظة بلحظة خلّى عملية الطلب أسهل بكتير.' },
    { name:'سارة نجيب', role:'الجيزة، مصر', rating:4, text:'تشكيلة المطاعم القريبة منّي ممتازة، وكود الخصم فعليًا اشتغل عند الدفع وهو ده النادر.' },
  ],

  orders: [
    { id:'WJ-10482', restaurant:'بيلا نابولي للبيتزا', date:'18 يونيو 2026', total:122.5, status:'تم التوصيل', items:3 },
    { id:'WJ-10410', restaurant:'سموك هاوس للبرجر', date:'12 يونيو 2026', total:94.5, status:'تم التوصيل', items:2 },
    { id:'WJ-10355', restaurant:'ساكورا للسوشي', date:'03 يونيو 2026', total:206, status:'ملغي', items:5 },
    { id:'WJ-10299', restaurant:'مطبخ الروضة الدمشقي', date:'27 مايو 2026', total:78.75, status:'تم التوصيل', items:2 },
  ],

  addresses: [
    { id:'a1', label:'المنزل', detail:'12 شارع التحرير، شقة 4ب، الدقي، الجيزة', isDefault:true },
    { id:'a2', label:'العمل', detail:'القرية الذكية، مبنى C3، طريق القاهرة الإسكندرية الصحراوي ك28', isDefault:false },
  ],

  getMenu(restaurantId){ return this.menus[restaurantId] || this.menus.default; },
  getRestaurant(id){ return this.restaurants.find(r => r.id === id); }
};