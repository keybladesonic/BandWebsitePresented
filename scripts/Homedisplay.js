/*eslint no-console: ["error", { allow: ["log"] }] */
(function(window) {
  "use strict";
  var App = window.App || {};

  function Display(displayId, db) {
    this.displayId = displayId;
    this.db = db;
  }

  Display.prototype.printOrders = function(cb) {
    this.db.getAll(function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  App.Display = Display;
  window.App = App;
})(window);
