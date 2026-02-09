const coursesData = {
  /* ================= MANAGEMENT & IT ================= */

  "banking-and-finance": {
    title: "Banking & Finance",
    category: "Management & IT",
    duration: "6 Months",
    eligibility: "Any Graduate / Final Year Students",
    description:
      "This course builds a strong foundation in banking operations, finance basics, accounting, and customer relationship management. Ideal for students aiming for careers in banks and financial institutions.",
    highlights: [
      "Core banking concepts",
      "Practical accounting knowledge",
      "Customer handling & compliance",
      "Placement assistance",
    ],
  },

  "digital-marketing-with-ai": {
    title: "Digital Marketing with AI",
    category: "Management & IT",
    duration: "4–6 Months",
    eligibility: "Any Graduate / Diploma Holders",
    description:
      "Learn modern digital marketing strategies combined with AI tools to run data-driven marketing campaigns across platforms.",
    highlights: [
      "SEO, SEM & Social Media Marketing",
      "AI-powered marketing tools",
      "Live project experience",
      "Industry-recognized certification",
    ],
  },

  "website-development": {
    title: "Website Development",
    category: "Management & IT",
    duration: "6 Months",
    eligibility: "12th Pass / Any Graduate",
    description:
      "Hands-on training in front-end and back-end website development with real-world projects and deployment practices.",
    highlights: [
      "HTML, CSS, JavaScript",
      "React basics",
      "Responsive & SEO-friendly sites",
      "Live project deployment",
    ],
  },

  "retail-management-and-e-commerce": {
    title: "Retail Management & E-Commerce",
    category: "Management & IT",
    duration: "6 Months",
    eligibility: "12th Pass / Any Graduate",
    description:
      "Understand retail operations, inventory management, and online commerce platforms with real case studies.",
    highlights: [
      "Retail operations management",
      "E-commerce platforms overview",
      "Customer experience strategies",
      "Job-oriented training",
    ],
  },

  /* ================= DESIGN TECHNOLOGY ================= */

  "fashion-design": {
    title: "Fashion Design",
    category: "Design Technology",
    duration: "12 Months",
    eligibility: "10th / 12th Pass",
    description:
      "Develop creativity and technical skills in garment design, pattern making, and fashion illustration.",
    highlights: [
      "Fashion sketching & illustration",
      "Garment construction",
      "Fabric & textile knowledge",
      "Portfolio development",
    ],
  },

  "jewellery-design": {
    title: "Jewellery Design",
    category: "Design Technology",
    duration: "6–12 Months",
    eligibility: "10th Pass & Above",
    description:
      "Learn traditional and modern jewellery design techniques with practical workshops.",
    highlights: [
      "Manual & digital jewellery design",
      "Gemstone knowledge",
      "Market trends & costing",
      "Certification support",
    ],
  },

  "interior-design": {
    title: "Interior Design",
    category: "Design Technology",
    duration: "12 Months",
    eligibility: "12th Pass",
    description:
      "Comprehensive training in space planning, furniture design, materials, and interior styling.",
    highlights: [
      "Residential & commercial interiors",
      "AutoCAD basics",
      "Material & lighting concepts",
      "Project-based learning",
    ],
  },

  "textile-design": {
    title: "Textile Design",
    category: "Design Technology",
    duration: "12 Months",
    eligibility: "10th / 12th Pass",
    description:
      "Learn fabric design, dyeing, printing techniques, and textile production processes.",
    highlights: [
      "Fabric & surface design",
      "Traditional & digital techniques",
      "Industry exposure",
      "Portfolio creation",
    ],
  },

  /* ================= HEALTHCARE ================= */

  "general-nursing": {
    title: "General Nursing",
    category: "Healthcare",
    duration: "24–36 Months",
    eligibility: "12th Pass (Science preferred)",
    description:
      "Professional nursing training focused on patient care, medical procedures, and hospital practices.",
    highlights: [
      "Clinical hospital training",
      "Patient care techniques",
      "Medical ethics & safety",
      "Career opportunities in hospitals",
    ],
  },

  phlebotomy: {
    title: "Phlebotomy Technician",
    category: "Healthcare",
    duration: "6 Months",
    eligibility: "12th Pass (Science preferred)",
    description:
      "Specialized training in blood collection techniques, laboratory safety, and patient handling.",
    highlights: [
      "Hands-on lab training",
      "Hospital exposure",
      "Infection control practices",
      "Job-oriented curriculum",
    ],
  },

  "medical-lab-assistant": {
    title: "Medical Lab Assistant",
    category: "Healthcare",
    duration: "12 Months",
    eligibility: "12th Pass (Science)",
    description:
      "Learn diagnostic lab procedures, sample collection, and laboratory equipment handling.",
    highlights: [
      "Clinical pathology basics",
      "Lab instruments handling",
      "Quality control methods",
      "Hospital internship",
    ],
  },

  "ot-assistant": {
    title: "Operation Theatre (OT) Assistant",
    category: "Healthcare",
    duration: "12 Months",
    eligibility: "12th Pass (Science)",
    description:
      "Training focused on assisting surgical teams and maintaining OT hygiene and protocols.",
    highlights: [
      "OT setup & sterilization",
      "Surgical assistance",
      "Patient safety protocols",
      "Hospital-based training",
    ],
  },

  "physiotherapy-assistant": {
    title: "Physiotherapy Assistant",
    category: "Healthcare",
    duration: "12 Months",
    eligibility: "12th Pass (Science)",
    description:
      "Assist physiotherapists in rehabilitation exercises, patient care, and therapy management.",
    highlights: [
      "Rehabilitation techniques",
      "Exercise therapy basics",
      "Patient assessment support",
      "Clinical exposure",
    ],
  },

  "icu-assistant": {
    title: "ICU Assistant",
    category: "Healthcare",
    duration: "12 Months",
    eligibility: "12th Pass (Science)",
    description:
      "Specialized training for assisting critical care units and handling ICU equipment.",
    highlights: [
      "Critical patient monitoring",
      "ICU equipment handling",
      "Emergency protocols",
      "Hospital internship",
    ],
  },

  "optometry-assistant": {
    title: "Optometry Assistant",
    category: "Healthcare",
    duration: "12 Months",
    eligibility: "12th Pass (Science)",
    description:
      "Learn eye examination support, vision testing, and optical clinic assistance.",
    highlights: [
      "Vision testing techniques",
      "Optical instruments knowledge",
      "Patient handling",
      "Clinic-based training",
    ],
  },

  /* ================= FOOD, CULINARY & NUTRITION ================= */

  "food-and-nutrition": {
    title: "Food & Nutrition",
    category: "Food, Culinary & Nutrition",
    duration: "6 Months",
    eligibility: "10th / 12th Pass",
    description:
      "Study nutrition science, diet planning, and healthy lifestyle practices.",
    highlights: [
      "Nutrition fundamentals",
      "Diet planning",
      "Health & wellness concepts",
      "Career in wellness sector",
    ],
  },

  "culinary-and-food-production": {
    title: "Culinary & Food Production",
    category: "Food, Culinary & Nutrition",
    duration: "6–12 Months",
    eligibility: "10th Pass & Above",
    description:
      "Professional culinary training covering food preparation, kitchen management, and hygiene.",
    highlights: [
      "Practical cooking sessions",
      "Kitchen safety & hygiene",
      "Continental & Indian cuisine",
      "Hotel & restaurant exposure",
    ],
  },

  "cake-making": {
    title: "Cake Making",
    category: "Food, Culinary & Nutrition",
    duration: "3–6 Months",
    eligibility: "Open to All",
    description:
      "Hands-on training in baking, cake decoration, and pastry preparation.",
    highlights: [
      "Baking fundamentals",
      "Cake decoration techniques",
      "Entrepreneurship guidance",
      "Home-bakery support",
    ],
  },

  "food-and-beverage": {
    title: "Food & Beverage Service",
    category: "Food, Culinary & Nutrition",
    duration: "6 Months",
    eligibility: "10th Pass & Above",
    description:
      "Training in food service operations, hospitality etiquette, and customer service.",
    highlights: [
      "Restaurant service techniques",
      "Hospitality etiquette",
      "Bar & beverage basics",
      "Placement support",
    ],
  },
};

export default coursesData;
