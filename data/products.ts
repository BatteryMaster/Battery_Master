export type Product = {
  id: number; name: string; category: string;
  price: string; stock: string; description: string; image: string;
  badge?: "hot" | "new" | "sale" | null; originalPrice?: string;
};

export const allProducts: Product[] = [
  // JK BMS
  { id:1,  name:"JK BMS 4S 100A",               category:"JK BMS",                price:"Rs. 4,500",  stock:"In Stock",  description:"JK Active Balance BMS 4S 100A. Li-ion / LiFePO4 support, Bluetooth app monitoring, overcharge, over-discharge & short circuit protection. Best BMS for DIY battery packs in Pakistan.", image:"/products/jk-bms-4s.jpg",        badge:"hot"  },
  { id:2,  name:"JK BMS 8S 100A",               category:"JK BMS",                price:"Rs. 5,800",  stock:"In Stock",  description:"JK BMS 8S 100A with active balancing. Supports 24V LiFePO4 & Li-ion packs. Bluetooth monitoring via JK BMS app. Over-temperature, over-current & cell protection.",              image:"/products/jk-bms-8s.jpg",        badge:"new"  },
  { id:3,  name:"JK BMS 16S 100A",              category:"JK BMS",                price:"Rs. 7,200",  stock:"In Stock",  description:"JK BMS 16S 100A for 48V battery packs. Active balancing, Bluetooth app, RS485 communication. Perfect for EV, solar & UPS applications.",                                          image:"/products/jk-bms-16s.jpg",       badge:null   },
  { id:4,  name:"JK BMS 20S 150A",              category:"JK BMS",                price:"Rs. 9,500",  stock:"Limited",   description:"JK BMS 20S 150A active balancer. 60V pack support. Ideal for high-power EV & energy storage systems. Real-time cell monitoring, temp sensors, Bluetooth & RS485.",               image:"/products/jk-bms-20s.jpg",       badge:null   },
  { id:5,  name:"JK BMS 24S 200A",              category:"JK BMS",                price:"Rs. 13,000", stock:"In Stock",  description:"JK BMS 24S 200A — heavy duty BMS for 72V EV & solar systems. Active cell balancing, Bluetooth, CAN/RS485. Reliable protection for large lithium battery packs.",               image:"/products/jk-bms-24s.jpg",       badge:null   },

  // Lithium Battery Packed
  { id:6,  name:"12V 20Ah Lithium Pack",        category:"Lithium Battery Packed", price:"Rs. 18,000", stock:"In Stock",  description:"12V 20Ah ready-made lithium ion battery pack with BMS. Lightweight, high cycle life. Ideal for solar backup, UPS & electric bikes in Pakistan.",                                 image:"/products/12v-20ah-pack.jpg",    badge:"hot"  },
  { id:7,  name:"24V 20Ah Lithium Pack",        category:"Lithium Battery Packed", price:"Rs. 32,000", stock:"In Stock",  description:"24V 20Ah lithium battery pack with built-in BMS & balancing. Perfect for electric rickshaw, solar inverter & industrial applications.",                                          image:"/products/24v-20ah-pack.jpg",    badge:null   },
  { id:8,  name:"48V 20Ah Lithium Pack",        category:"Lithium Battery Packed", price:"Rs. 55,000", stock:"In Stock",  description:"48V 20Ah lithium pack for e-bikes, solar systems & UPS. High-quality cells with JK BMS. Long lifespan, lightweight design.",                                                    image:"/products/48v-20ah-pack.jpg",    badge:"new"  },
  { id:9,  name:"72V 30Ah Lithium Pack",        category:"Lithium Battery Packed", price:"Rs. 95,000", stock:"Limited",   description:"72V 30Ah high-power lithium battery pack for heavy electric bikes & EV conversions. Grade-A cells, BMS included, 500+ charge cycles.",                                         image:"/products/72v-30ah-pack.jpg",    badge:null   },

  // Battery Box
  { id:10, name:"12V Battery Box Plastic",      category:"Battery Box",           price:"Rs. 650",    stock:"In Stock",  description:"Durable plastic battery enclosure for 12V lithium packs. IP54 rated, cable gland holes, easy assembly. Suitable for 3S–4S cell configurations.",                                  image:"/products/battery-box-12v.jpg",  badge:null   },
  { id:11, name:"24V Aluminum Battery Box",     category:"Battery Box",           price:"Rs. 1,800",  stock:"In Stock",  description:"Heavy duty aluminum battery box for 24V packs. Heat dissipation fins, waterproof seal, lockable lid. Ideal for EVs & solar installations.",                                         image:"/products/battery-box-24v.jpg",  badge:"new"  },
  { id:12, name:"48V E-Bike Battery Box",       category:"Battery Box",           price:"Rs. 2,500",  stock:"In Stock",  description:"48V e-bike battery enclosure with lock & key, rack mount holes. Fits standard 13S/14S lithium packs. UV-resistant plastic, sleek design.",                                         image:"/products/battery-box-48v.jpg",  badge:"hot"  },
  { id:13, name:"72V Triangle Battery Box",     category:"Battery Box",           price:"Rs. 3,200",  stock:"Limited",   description:"72V triangle-style battery box for electric bikes. Fits inside bicycle frame. Aluminum construction, USB port hole, waterproof. Popular for EV conversions.",                       image:"/products/battery-box-72v.jpg",  badge:null   },

  // Lithium Ion Cell
  { id:14, name:"Samsung 18650 2600mAh",        category:"Lithium Ion Cell",      price:"Rs. 850",    stock:"In Stock",  description:"Genuine Samsung INR18650-26J 2600mAh lithium ion cell. 3.6V nominal, high drain 5A continuous. Grade-A, tested capacity. Best 18650 cells in Karachi Pakistan.",                 image:"/products/samsung-26j.jpg",      badge:"hot"  },
  { id:15, name:"Samsung 18650 3000mAh",        category:"Lithium Ion Cell",      price:"Rs. 950",    stock:"In Stock",  description:"Samsung INR18650-30Q 3000mAh high-drain cell. 15A continuous discharge. Perfect for power tools, e-bikes & custom battery packs.",                                                image:"/products/samsung-30q.jpg",      badge:null   },
  { id:16, name:"LG 18650 3500mAh",             category:"Lithium Ion Cell",      price:"Rs. 1,100",  stock:"In Stock",  description:"LG MJ1 18650 3500mAh high capacity lithium cell. 10A continuous, 3.635V nominal. Excellent for high-capacity battery packs & power banks.",                                      image:"/products/lg-mj1.jpg",           badge:"new"  },
  { id:17, name:"Panasonic NCR 18650B 3400mAh", category:"Lithium Ion Cell",      price:"Rs. 1,200",  stock:"Limited",   description:"Panasonic NCR18650B 3400mAh protected lithium cell. Premium grade, low self-discharge. Trusted brand for professional battery assembly.",                                          image:"/products/panasonic-ncr.jpg",    badge:null   },

  // LiFePO4 Cell
  { id:18, name:"EVE LF105 LiFePO4 105Ah",      category:"LiFePO4 Cell",          price:"Rs. 3,500",  stock:"In Stock",  description:"EVE LF105 LiFePO4 prismatic cell 3.2V 105Ah. Grade-A, 3000+ cycles, excellent thermal stability. Ideal for solar energy storage & EV battery packs.",                          image:"/products/eve-lf105.jpg",        badge:"hot"  },
  { id:19, name:"EVE LF280K LiFePO4 280Ah",     category:"LiFePO4 Cell",          price:"Rs. 8,500",  stock:"In Stock",  description:"EVE LF280K 280Ah LiFePO4 prismatic cell 3.2V. Popular Grade-A cell for DIY solar battery banks. 6000+ cycles, safe chemistry, no thermal runaway.",                             image:"/products/eve-lf280k.jpg",       badge:"new"  },
  { id:20, name:"CATL 200Ah LiFePO4 Cell",      category:"LiFePO4 Cell",          price:"Rs. 7,200",  stock:"In Stock",  description:"CATL Grade-A 200Ah LiFePO4 prismatic cell. 3.2V, ultra-long life 4000+ cycles. World's #1 battery manufacturer. Perfect for solar & EV applications.",                          image:"/products/catl-200ah.jpg",       badge:null   },
  { id:21, name:"CATL 304Ah LiFePO4 Cell",      category:"LiFePO4 Cell",          price:"Rs. 11,000", stock:"Limited",   description:"CATL 304Ah large-format LiFePO4 cell. 3.2V, Grade-A. Maximum capacity for solar home storage & heavy EV builds. Exceptional cycle life & safety.",                              image:"/products/catl-304ah.jpg",       badge:null   },

  // LCD Display
  { id:22, name:"12V Battery Level Indicator",  category:"LCD Display",           price:"Rs. 450",    stock:"In Stock",  description:"12V lithium battery LED bar graph indicator. 10-segment display, simple 2-wire connection. Shows SOC (State of Charge) for 3S/4S li-ion packs.",                                  image:"/products/indicator-12v.jpg",    badge:null   },
  { id:23, name:"Coulometer Battery Monitor",   category:"LCD Display",           price:"Rs. 1,200",  stock:"In Stock",  description:"High-accuracy coulometer LCD display. Shows voltage, current, capacity (Ah), SOC%, power. Wide 8–120V range. Hall sensor included. Perfect for EV & solar monitoring.",          image:"/products/coulometer.jpg",       badge:"hot"  },
  { id:24, name:"48V E-Bike LCD S866",          category:"LCD Display",           price:"Rs. 1,800",  stock:"In Stock",  description:"S866 LCD display panel for 48V e-bikes. Shows speed, battery, gear, odometer. Waterproof IP65, 5-pin connector. Compatible with most hub motor controllers.",                   image:"/products/lcd-s866.jpg",         badge:"new"  },
  { id:25, name:"72V LCD Battery Dashboard",    category:"LCD Display",           price:"Rs. 2,200",  stock:"Limited",   description:"72V e-bike LCD dashboard with speedometer, battery indicator, trip meter. Backlit display, waterproof. Compatible with BLDC motor controllers.",                                 image:"/products/lcd-72v.jpg",          badge:null   },

  // EVE Bike Kits
  { id:26, name:"48V 1000W E-Bike Kit",         category:"EVE Bike Kits",         price:"Rs. 22,000", stock:"In Stock",  description:"Complete 48V 1000W e-bike conversion kit. Includes hub motor, controller, throttle, LCD display & wiring. Convert any bicycle to electric in Pakistan.",                         image:"/products/ebike-kit-48v.jpg",    badge:"hot"  },
  { id:27, name:"60V 1500W E-Bike Kit",         category:"EVE Bike Kits",         price:"Rs. 32,000", stock:"In Stock",  description:"60V 1500W high-speed e-bike conversion kit. 26-inch rear hub motor, 30A controller, thumb throttle, brake levers & wiring harness. Ready to install.",                          image:"/products/ebike-kit-60v.jpg",    badge:null   },
  { id:28, name:"72V 3000W E-Bike Kit",         category:"EVE Bike Kits",         price:"Rs. 52,000", stock:"Limited",   description:"72V 3000W high-power e-bike kit for heavy conversion. Includes 3000W motor, 45A controller, color LCD, PAS sensor & accessories.",                                            image:"/products/ebike-kit-72v.jpg",    badge:"new"  },

  // Chargers
  { id:29, name:"12V 5A Lithium Charger",       category:"Chargers",              price:"Rs. 1,800",  stock:"In Stock",  description:"12.6V / 14.6V lithium / LiFePO4 smart charger. 5A fast charge, CC/CV mode, auto cutoff, LED indicator. Safe & reliable charger for 3S/4S packs.",                             image:"/products/charger-12v.jpg",      badge:null   },
  { id:30, name:"24V 10A Lithium Charger",      category:"Chargers",              price:"Rs. 3,500",  stock:"In Stock",  description:"24V 29.4V / 29.2V (LiFePO4) 10A smart charger. Fast charging with CC/CV algorithm. Short circuit & over-voltage protection. Metal housing.",                                  image:"/products/charger-24v.jpg",      badge:"new"  },
  { id:31, name:"48V 10A E-Bike Charger",       category:"Chargers",              price:"Rs. 5,500",  stock:"In Stock",  description:"48V 10A lithium e-bike charger with XLR connector. Auto CC/CV cutoff, fan cooled, LED indicators. Compatible with most 13S/14S li-ion packs.",                                 image:"/products/charger-48v.jpg",      badge:"hot"  },
  { id:32, name:"72V 5A E-Bike Charger",        category:"Chargers",              price:"Rs. 6,800",  stock:"Limited",   description:"72V 5A smart charger for 20S lithium packs. Auto shutoff when full, overcharge protection, LED status. Suitable for heavy e-bikes & EV batteries.",                             image:"/products/charger-72v.jpg",      badge:null   },

  // EVE Bike Display
  { id:33, name:"S900 Color TFT Display",       category:"EVE Bike Display",      price:"Rs. 2,800",  stock:"In Stock",  description:"S900 color TFT e-bike display. Shows speed, battery %, power, PAS level, range & trip. IP67 waterproof, USB charging port. Supports UART communication.",                     image:"/products/display-s900.jpg",     badge:"hot"  },
  { id:34, name:"KT LCD3 E-Bike Display",       category:"EVE Bike Display",      price:"Rs. 1,500",  stock:"In Stock",  description:"KT LCD3 display for KT/Kunteng motor controllers. 36V/48V compatible, shows speed, battery, PAS, mode. 5-pin connector, simple setup.",                                       image:"/products/display-kt-lcd3.jpg",  badge:null   },
  { id:35, name:"SW102 Wireless Display",       category:"EVE Bike Display",      price:"Rs. 3,500",  stock:"Limited",   description:"SW102 wireless Bluetooth e-bike display. Connects without cable. Round design, OLED screen, shows speed & battery. Compatible with TSDZ2 & BBSHD mid-drive motors.",          image:"/products/display-sw102.jpg",    badge:"new"  },

  // Meter Tools (Silicon wires, terminals, testers, etc.)
  { id:36, name:"Silicon Wire 10AWG Red (1m)",  category:"Meter Tools",           price:"Rs. 280",    stock:"In Stock",  description:"10AWG high-strand-count silicone wire — red. Rated 150C, flexible, 30A capacity. Ideal for battery pack wiring, e-bikes & high-current electronics.",                          image:"/products/silicon-wire-red.jpg", badge:null   },
  { id:37, name:"Silicon Wire 10AWG Black (1m)",category:"Meter Tools",           price:"Rs. 280",    stock:"In Stock",  description:"10AWG silicone wire black, 1 meter. High temperature rated 150C, flexible stranded copper. Perfect for BMS wiring, motor connections & power cables.",                       image:"/products/silicon-wire-black.jpg",badge:null  },
  { id:38, name:"Silicon Wire 12AWG Red (1m)",  category:"Meter Tools",           price:"Rs. 200",    stock:"In Stock",  description:"12AWG silicone flexible wire red, 1 meter. 20A continuous, high-temp rated. Great for cell-level connections, balance wires & BMS leads.",                                     image:"/products/silicon-12awg-red.jpg",badge:null   },
  { id:39, name:"XT60 Connector Pair",          category:"Meter Tools",           price:"Rs. 250",    stock:"In Stock",  description:"XT60 male & female connector pair. Gold-plated contacts, 60A continuous rating. Standard connector for e-bike batteries, chargers & RC applications.",                        image:"/products/xt60-connector.jpg",   badge:null   },
  { id:40, name:"Anderson SB50 Connector",      category:"Meter Tools",           price:"Rs. 550",    stock:"In Stock",  description:"Anderson SB50 heavy-duty power connector 50A. Industry standard for EV charging & battery packs. Available in grey & red. Reliable & weather-resistant.",                      image:"/products/anderson-sb50.jpg",    badge:null   },
  { id:41, name:"Ring Terminal Kit (50pcs)",    category:"Meter Tools",           price:"Rs. 350",    stock:"In Stock",  description:"50-piece copper ring terminal set. Sizes M4/M5/M6/M8. Tinned copper, heat-shrink insulated. For battery connections, ground straps & electrical wiring.",                     image:"/products/ring-terminals.jpg",   badge:"new"  },
  { id:42, name:"Digital Battery Tester",       category:"Meter Tools",           price:"Rs. 950",    stock:"In Stock",  description:"Digital battery capacity tester. Measures voltage, capacity (mAh), internal resistance. Works on 18650, LiPo, LiFePO4 cells. Essential for cell grading & QC.",          image:"/products/battery-tester.jpg",   badge:"hot"  },
  { id:43, name:"Nickel Strip 0.1mm x 8mm (1m)",category:"Meter Tools",          price:"Rs. 400",    stock:"In Stock",  description:"Pure nickel strip 0.1mm x 8mm, 1 meter roll. For 18650/21700 battery pack spot welding. Low resistance, high conductivity. Compatible with most spot welders.",                image:"/products/nickel-strip.jpg",     badge:null   },
  { id:44, name:"Spot Welder Kit 18650",        category:"Meter Tools",           price:"Rs. 8,500",  stock:"Limited",   description:"Battery spot welder kit for 18650/21700 cells. 1–6ms pulse width, foot pedal, nickel strip set included. Build professional battery packs at home in Karachi.",               image:"/products/spot-welder.jpg",      badge:null   },
];

export const featuredProducts = allProducts.filter(p => p.badge === "hot").slice(0, 6);
export const categories = [
  "All",
  "JK BMS",
  "Lithium Battery Packed",
  "Battery Box",
  "Lithium Ion Cell",
  "LiFePO4 Cell",
  "LCD Display",
  "EVE Bike Kits",
  "Chargers",
  "EVE Bike Display",
  "Meter Tools",
];
