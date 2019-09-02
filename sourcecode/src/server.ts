import app from "./expressConfig";
import { Server, createServer } from "http";

let port: number = 8080;

app.set("port", port);

let server: Server = createServer(app);

server.listen(port);

export default server;