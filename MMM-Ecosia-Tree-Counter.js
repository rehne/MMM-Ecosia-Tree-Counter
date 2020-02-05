Module.register("MMM-Ecosia-Tree-Counter", {
  defaults: {},
  start: function() {},
  getDom: function() {
    let wrapper = document.createElement("div");
    let element = document.createElement("p");
    element.id = "tree-counter";
    element.classList = "medium large light";
    element.style = "margin-top: 0px;";
    wrapper.appendChild(element);
    return wrapper;
  },
  notificationReceived: function(notification, payload) {
    if (notification === "DOM_OBJECTS_CREATED") {
      setInterval(() => {
        this.sendSocketNotification("GET_TREES");
      }, 1000);
    }
  },
  socketNotificationReceived: function(notification, payload) {
    if (notification === "TREE_COUNT") {
      let element = document.getElementById("tree-counter");
      element.innerHTML = payload.toLocaleString("de-DE");
    }
  }
});
