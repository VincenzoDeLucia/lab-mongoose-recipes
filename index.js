const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  // .then(() => {
  //Run your code here, after you have insured that the connection was made
  // return Recipe.create({
  // title: "Gummy Bear Paella",
  // level: "UltraPro Chef",
  // ingredients: ["Gummy Bears", "Gummy Worms", "Rice"],
  // cuisine: "Sure, let's call it that",
  // dishType: "other",
  // duration: 9000000,
  // creator: "Elon Musk",
  // });
  // })
  // .then((myRecipe) => {
  // console.log(`Here is my recipe: ${myRecipe}`);
  // })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title);
      return recipes;
    });
  })
  .then((recipes) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    console.log("Successfully updated");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Successfully deleted!");
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("Mongoose disconnected.");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
