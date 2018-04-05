(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }
  function BandInfor(selector){
    if (!selector) {
      throw new Error("No Selector Provided");
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  CheckList.prototype.addRow = function(bandList) {
    var rowElement = new Row(bandList);
    this.$element.append(rowElement.$element);
  };

  function Row(bandList) {
    var $div = $("<div></div>", {
      "data-coffee-order": "checkbox",
      "class": "checklist"
    });
    var $label = $("<label></label>");

    var $moreinfo = $("<button data-coffee-order='moreinfobutton' class='btn btn-primary' onclick=\"window.location.href='/bandpage.html?bandName=" + bandList.bandName + "'\">More Info</button>", {
     type: "button",

   });

   var $review = $("<button data-coffee-order='reviewbutton' class='btn btn-primary reviewbutton' onclick=\"window.location.href='/review.html?bandName=" + bandList.bandName + "'\">Review</button>", {
     type: "button",
   });



    var description = "<div class=\"comment-img\"><img src="+ bandList.BandImage +"  width=\"250\" height=\"150\" /> </div>";
    description += bandList.bandName + " on ";
    description += bandList.EventDate + " at ";
    description += bandList.EventLocation + " ";

    $label.append(description);
    $label.append($moreinfo);
    $label.append($review);
    $div.append($label);

    this.$element = $div;
  }
  App.BandInfor = BandInfor;
  App.CheckList = CheckList;
  window.App = App;
})(window);
