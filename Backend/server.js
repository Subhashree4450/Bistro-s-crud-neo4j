

// require("dotenv").config();
// const express = require("express");

// const app = express();
// app.use(express.json());

// app.use("/cakes", require("./routes/cakes"));
// app.use("/customers", require("./routes/customers"));
// app.use("/buys", require("./routes/buys"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require("dotenv").config();
const express = require("express");
const cors = require("cors"); 

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  methods: "GET, POST, PUT, DELETE", 
  allowedHeaders: "Content-Type"
}));

app.use("/cakes", require("./routes/cakes"));
app.use("/customers", require("./routes/customers"));
app.use("/buys", require("./routes/buys"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

