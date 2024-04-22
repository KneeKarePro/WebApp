const WebSocket = require("ws");
const http = require("http");

// Initialize WebSocket Server on port 80
const wss = new WebSocket.Server({ port: 80 }, () => {
  console.log("WebSocket Server started on port 80");
});

// Handle WebSocket connections
wss.on("connection", function connection(ws) {
  console.log("A new client connected");
  ws.on("close", () => console.log("Client disconnected"));
});

class DataPoller {
  constructor(options, interval) {
    this.options = options;
    this.interval = interval;
    this.intervalHandle = null;
  }

  fetchData() {
    const req = http.request(this.options, (res) => {
      res.on("data", (d) => {
        //console.log(`Potentiometer value: ${d.toString().trim()}`);
        // Broadcast to all connected WebSocket clients
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(d.toString().trim()); // Ensure data is a string and trimmed
          }
        });
      });
    });

    req.on("error", (error) => {
      console.error("HTTP request error:", error);
      // Optionally send error message to WebSocket clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send("ERROR: " + error.message);
        }
      });
    });

    req.end();
  }

  start() {
    this.stop(); // Ensure no intervals are doubled up
    this.intervalHandle = setInterval(() => this.fetchData(), this.interval);
    console.log("Polling started...");
  }

  stop() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      console.log("Polling stopped...");
    }
  }
}

const options = {
  hostname: "192.168.4.1",
  port: 80,
  path: "/",
  method: "GET",
};
const poller = new DataPoller(options, 50);
poller.start();
