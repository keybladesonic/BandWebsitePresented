(function(window) {
  "use strict";
  var App = window.App;
  var FORM_SELECTOR = "[data-coffee-order='bandpageform']";
  var CHECKLIST_SELECTOR = "[data-coffee-order='checklist']";


  var SERVER_URL = "http://localhost:2403/band";
  var Display = App.Display;
  var $ = window.jQuery;
  //var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var CheckList = App.CheckList;
  var FormHandler = App.FormHandler;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Display("ncc-1701", remoteDS);
  window.myTruck = myTruck;





  var checkList = new CheckList(CHECKLIST_SELECTOR);
  $(FORM_SELECTOR).ready(function() {
    myTruck.printOrders.call(myTruck, function(serverResponse) {
      $.each(serverResponse, function(i, bandList) {
        checkList.addRow.call(checkList, bandList);
      });
    });
  });

})(window);
