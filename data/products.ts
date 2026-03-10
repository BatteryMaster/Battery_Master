export type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  image: string;
};

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Arduino Uno R3",
    category: "Modules",
    price: "Rs. 1,850",
    stock: "In Stock",
    description:
      "Arduino Uno R3 is a popular development board for electronics projects, learning, and prototyping.",
    image: "/products/arduino-uno.jpg",
  },
  {
    id: 2,
    name: "NE555 Timer IC",
    category: "ICs",
    price: "Rs. 80",
    stock: "In Stock",
    description:
      "NE555 Timer IC is widely used in timer, pulse generation, and oscillator circuits.",
    image: "/products/ne555-ic.jpg",
  },
  {
    id: 3,
    name: "BC547 Transistor",
    category: "Transistors",
    price: "Rs. 25",
    stock: "In Stock",
    description:
      "BC547 is a commonly used NPN transistor for switching and amplification circuits.",
    image: "/products/bc547.jpg",
  },
  {
    id: 4,
    name: "Digital Multimeter",
    category: "Tools",
    price: "Rs. 2,450",
    stock: "Limited",
    description:
      "Digital multimeter for measuring voltage, current, resistance, and basic electronics troubleshooting.",
    image: "/products/digital-multimeter.jpg",
  },
  {
    id: 5,
    name: "LM358 IC",
    category: "ICs",
    price: "Rs. 120",
    stock: "In Stock",
    description:
      "LM358 is a dual operational amplifier used in signal conditioning and analog projects.",
    image: "/products/lm358-ic.jpg",
  },
  {
    id: 6,
    name: "10K Resistor Pack",
    category: "Resistors",
    price: "Rs. 150",
    stock: "In Stock",
    description:
      "10K resistor pack for breadboard practice, electronics repair, and DIY circuits.",
    image: "/products/10k-resistor-pack.jpg",
  },
  {
    id: 7,
    name: "Soldering Iron 60W",
    category: "Tools",
    price: "Rs. 950",
    stock: "In Stock",
    description:
      "60W soldering iron suitable for electronics repair, soldering practice, and workshop use.",
    image: "/products/soldering-iron.jpg",
  },
  {
    id: 8,
    name: "Relay Module 5V",
    category: "Modules",
    price: "Rs. 280",
    stock: "In Stock",
    description:
      "5V relay module for switching AC/DC loads using microcontrollers and automation projects.",
    image: "/products/relay-module-5v.jpg",
  },
];

export const featuredProducts: Product[] = allProducts.slice(0, 4);

export const categories = [
  "All",
  "Modules",
  "ICs",
  "Transistors",
  "Resistors",
  "Tools",
];