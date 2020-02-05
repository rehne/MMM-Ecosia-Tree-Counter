const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({
  start: function() {
    console.log(`Starting node_helper for module ${this.name}`);
  },

  socketNotificationReceived: function(notification) {
    if (notification === "GET_TREES") {
      this.getTrees();
    }
  },

  getTrees: function() {
    let self = this;
    request(
      {
        url: "https://api.ecosia.org/v1/trees/count",
        method: "GET"
      },
      (error, response, body) => {
        if (error) {
          console.error(`Error: ${error}. StatusCode: ${response.statusCode}`);
        } else {
          let jsonObject = JSON.parse(body);
          let counter = jsonObject.count;
          self.sendSocketNotification("TREE_COUNT", counter);
        }
      }
    );
  }
});
