import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Keyboard",
    image:
      "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "250",
  },
  {
    name: "Headphones",
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "300",
  },
  {
    name: "Monitor",
    image:
      "https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "1100",
  },
  {
    name: "Camera GoPro Hero 12",
    image:
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: "2500",
  },
  {
    name: "Alexa Echo Dot",
    image:
      "https://images.pexels.com/photos/14309815/pexels-photo-14309815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "350",
  },
  {
    name: "Iphone 15",
    image:
      "https://images.pexels.com/photos/29020349/pexels-photo-29020349.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: "6500",
  },
  {
    name: "Mouse Gamer Logitech G502",
    image:
      "https://images.pexels.com/photos/6236591/pexels-photo-6236591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "100",
  },
  {
    name: "Xbox One S Controller",
    image:
      "https://images.pexels.com/photos/8947923/pexels-photo-8947923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: "520",
  },
];

const seedDatabase = async () => {
  try {
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    for (const product of SAMPLE_PRODUCTS) {
      await sql`
            INSERT INTO products (name, image, price)
            VALUES (${product.name}, ${product.image}, ${product.price})
        `;
    }

    console.log("Database seeded sucessfully!");
    process.exit(0); // sucess code
  } catch (error) {
    console.log("Error seeding database: ", error);
    process.exit(1); // failure code
  }
};

seedDatabase();
