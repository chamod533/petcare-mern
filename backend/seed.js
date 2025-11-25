const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const data = [
  // Existing products
  { 
    "name": "Premium Dog Food 5kg", 
    "category": "Food", 
    "price": 45.99, 
    "image": "/images/food.png", 
    "description": "A complete and balanced 5kg dry dog food containing high-quality chicken protein, brown rice, vitamins, and Omega-3 fatty acids. Supports digestion, lean muscle growth, strong bones, and coat shine. Ideal for adult dogs of all breeds.",
    "countInStock": 10
  },
  { 
    "name": "Leather Dog Collar", 
    "category": "Accessories", 
    "price": 12.50, 
    "image": "/images/belt.png", 
    "description": "Premium handcrafted leather dog collar in classic brown. Built with full-grain leather and a stainless steel buckle for durability. Available in M and L sizes. Comfortable fit and long-lasting finish.",
    "countInStock": 25
  },
  { 
    "name": "Cat Toy Mouse", 
    "category": "Toys", 
    "price": 4.99, 
    "image": "/images/toy.png", 
    "description": "Soft plush mouse toy with durable stitching, crinkle sound, and lightweight design. Encourages natural hunting instincts and keeps cats entertained for hours. Size: 10 cm.",
    "countInStock": 50
  },

  {
    "name": "Royal Canin Puppy Dry Food",
    "price": 18.99,
    "category": "Food",
    "description": "Scientifically formulated puppy dry food with DHA for brain development, high protein for growth, and antioxidants for a stronger immune system. Small kibble size suitable for young puppies.",
    "image": "/images/foodroyal.png",
    "countInStock": 40
  },
  {
    "name": "Purina Cat Complete Nutrition",
    "price": 14.50,
    "category": "Food",
    "description": "A nutrient-rich dry cat food with antioxidants, essential vitamins, and minerals. Supports a strong immune system, shiny coat, and overall cat vitality. Salmon & chicken blend flavor.",
    "image": "/images/puurna.png",
    "countInStock": 30
  },
  {
    "name": "Pedigree Chicken Treats",
    "price": 6.99,
    "category": "Food",
    "description": "Soft and chewy chicken-flavored treats ideal for training and rewarding dogs. High in protein with no artificial flavors. Perfect daily snack for adult dogs.",
    "image": "/images/meat.png",
    "countInStock": 25
  },

  {
    "name": "Tennis Fetch Ball",
    "price": 4.99,
    "category": "Toys",
    "description": "Durable, high-bounce tennis ball made with a non-toxic rubber core and felt coating. Neon yellow color for easy visibility. Diameter: 6.5 cm. Perfect for active fetch play.",
    "image": "/images/ball.png",
    "countInStock": 60
  },
  {
    "name": "Cat Feather Wand Toy",
    "price": 7.25,
    "category": "Toys",
    "description": "Interactive feather wand with a flexible 40 cm handle and multicolor feathers (18 cm). Encourages activity, reduces boredom, and strengthens bonding with your cat.",
    "image": "/images/father.png",
    "countInStock": 50
  },
  {
    "name": "Squeaky Plush Bone",
    "price": 8.90,
    "category": "Toys",
    "description": "Soft plush bone toy with a built-in squeaker. Size: 20 cm. Reinforced stitching ensures durability. Available in pink, blue, or brown. Great for fun indoor play.",
    "image": "/images/dogtoy.png",
    "countInStock": 20
  },

  {
    "name": "Adjustable Dog Collar – Blue",
    "price": 9.99,
    "category": "Belts",
    "description": "Lightweight adjustable nylon dog collar in ocean blue. Comfortable padded interior and rust-proof metal ring. Ideal for medium-sized dogs. Size: 25–35 cm.",
    "image": "/images/blue.png",
    "countInStock": 15
  },
  {
    "name": "Leather Dog Leash – Brown",
    "price": 22.50,
    "category": "Belts",
    "description": "Premium dark brown leather leash with polished heavy-duty metal clip. Length: 120 cm. Perfect for daily walks and training medium to large dogs.",
    "image": "/images/brown.png",
    "countInStock": 10
  },
  {
    "name": "Reflective Collar with Tag Ring",
    "price": 12.00,
    "category": "Belts",
    "description": "Black collar with high-visibility reflective strips for nighttime safety. Includes sturdy ID tag ring and breathable padding. Available in sizes S, M, L.",
    "image": "/images/coloer.png",
    "countInStock": 25
  },

  {
    "name": "Pet Flea & Tick Tablets",
    "price": 34.99,
    "category": "Medicine",
    "description": "Vet-approved flea and tick tablets effective within hours. Provides 30-day full-body protection. Suitable for dogs and cats over 2 kg. Pack of 30 tablets.",
    "image": "/images/dogmed.png",
    "countInStock": 17
  },
  {
    "name": "Joint Health Supplement Chews",
    "price": 19.99,
    "category": "Medicine",
    "description": "Chicken-flavored joint support chews containing Glucosamine, Chondroitin, and MSM. Helps reduce stiffness and improve mobility. Pack includes 60 soft chews.",
    "image": "/images/joint.png",
    "countInStock": 22
  },
  {
    "name": "Digestive Probiotic Powder",
    "price": 15.50,
    "category": "Medicine",
    "description": "Digestive probiotic powder with multi-strain probiotics and prebiotics. Supports gut health, reduces bloating, and increases nutrient absorption. 100g container.",
    "image": "/images/pro.png",
    "countInStock": 20
  },

  {
    "name": "Anti-Shedding Dog Brush",
    "price": 11.99,
    "category": "Grooming",
    "description": "Stainless-steel de-shedding tool designed to reduce shedding by up to 90%. Features a comfortable grip handle. Color: Grey & Blue. Suitable for all breeds.",
    "image": "/images/grooming.png",
    "countInStock": 40
  },
  {
    "name": "Organic Pet Shampoo",
    "price": 9.25,
    "category": "Grooming",
    "description": "Aloe & oatmeal organic pet shampoo with moisturizing, tear-free, and sulfate-free formula. Perfect for sensitive skin. Bottle size: 300 ml.",
    "image": "/images/shampoo.png",
    "countInStock": 30
  },
  {
    "name": "Pet Nail Clipper",
    "price": 7.99,
    "category": "Grooming",
    "description": "Stainless-steel nail clipper with anti-slip handle and safety guard for smooth, injury-free trimming. Color: Black & Red.",
    "image": "/images/tool.png",
    "countInStock": 18
  },

  {
    "name": "Soft Round Pet Bed",
    "price": 25.00,
    "category": "Accessories",
    "description": "Ultra-soft plush round pet bed with anti-slip bottom. Available in Light Grey. Sizes: S (45cm), M (60cm), L (75cm). Machine-washable and perfect for cozy naps.",
    "image": "/images/softbed.png",
    "countInStock": 15
  },
  {
    "name": "Portable Pet Travel Carrier",
    "price": 39.99,
    "category": "Accessories",
    "description": "Ventilated and lightweight travel carrier with mesh windows for airflow. Color: Grey/Black. Dimensions: 45×30×28 cm. Includes removable soft bed insert.",
    "image": "/images/carri.png",
    "countInStock": 12
  },
  {
    "name": "Stainless Pet Food Bowl",
    "price": 8.50,
    "category": "Accessories",
    "description": "Rust-proof stainless steel food bowl with non-slip rubber base. Available in sizes S (350ml), M (700ml), L (1100ml). Easy to clean and durable.",
    "image": "/images/foodpot.png",
    "countInStock": 50
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({}); // Clears old data
  await Product.insertMany(data);
  console.log('Seeded all products!');
  process.exit();
}

seed();
