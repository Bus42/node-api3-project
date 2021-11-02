// require your server and launch it
const server = require("./api/server");
const PORT = 5280;

server.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
