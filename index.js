// require your server and launch it
const server = require("./api/server");
const colors = require("colors");

const PORT = 5280;

colors.enable();

server.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`.rainbow);
});
