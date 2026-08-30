const app = require("./app");
const { connectDB } = require("./config/db");
const env = require("./config/env");

async function startServer() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log("Server Started At PORT NO: ", env.PORT);
  });
}

startServer();
