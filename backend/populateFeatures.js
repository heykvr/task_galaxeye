const mongoose = require("mongoose");
const fs = require("fs");

// Update this with the path to your JSON file
const filePath = "./features.json";

// MongoDB connection URI
const mongoURI = "mongodb://mongo:27017/geoData";

// Schema definition for GeoJSON Feature
const featureSchema = new mongoose.Schema({
  type: { type: String, required: true },
  properties: { fill: { type: String, required: true } },
  geometry: {
    type: { type: String, required: true },
    coordinates: { type: [[[Number]]] },
  },
});

// Create a Mongoose model
const Feature = mongoose.model("Feature", featureSchema);

async function storeData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Insert data into the database
    await Feature.insertMany(jsonData.features);
    console.log("Data successfully stored in MongoDB");

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

storeData();