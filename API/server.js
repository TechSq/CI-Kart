const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const app = require("express")();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const server = require("http").createServer(app);

const bodyParser = require("body-parser");
const helmet = require("helmet");
const passport = require("passport");
const cors = require("cors");
const {
  application: { port },
} = require("./config/config.json");
const { tenants } = require("./config/config.json");
require("./models/db.js").connect(tenants[0].databaseURL);
const router = require("./routes");
app.use(cors());
app.use(helmet());
app.use(
  bodyParser.json({
    inflate: true,
    limit: "100kb",
    eviver: null,
    strict: true,
    type: "application/json",
    verify: undefined,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
const strategies = require("./shared/passport");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  next();
});
strategies(passport);

app.use("/api/v1", router(passport));

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`VGM Service Started At Port: ${port}`);
});
