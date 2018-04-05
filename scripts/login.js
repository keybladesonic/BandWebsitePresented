var bandPageURL = "http://localhost:2403/band.html";
var url = "http://localhost:2403/user";

// Modal and login trigger button
var modalAll = document.getElementById("modalDisplay");
var modalBox = document.getElementById("modalBox")
var modalBtn = document.getElementById("presentModal");

// Forms
var loginForm = document.getElementById("loginForm");
var signUpForm = document.getElementById("signUpForm");

// Title
var title = document.getElementById("header");

// Fields
var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPass");
var bandName = document.getElementById("bandName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPass");
var confirmPassword = document.getElementById("confirmPass");

// Buttons
var signInBtn = document.getElementById("submitSignIn");
var signUpBtn = document.getElementById("submitSignUp");

// Links
var linkToSignUp = document.getElementById("linkToSignUp");
var linkToSignIn = document.getElementById("linkToSignIn");

// Error reporting
var loginError = document.getElementById("loginError");
var signUpError = document.getElementById("signUpError");


// Begin hidden
$(modalAll).fadeOut(0);
$(signUpForm).hide();
$(loginError).hide();
$(signUpError).hide();


// If the button is clicked, show the modal view
$(modalBtn).click(function () {
  $("#loginForm").trigger("reset");
  $(modalAll).fadeIn();
  $(signInEmail).focus();
});


// If the background is clicked, close the modal
$(modalAll).click(function (e){
  if(e.target == modalAll) {
    $(modalAll).fadeOut();
  }
});


// Handles swapping to sign up page
$(linkToSignUp).click(function(){
  // Hide the login form and show the sign up form
  $(loginForm).hide();
  $(signUpForm).fadeIn(500);
  $(modalBox).css("height", 590);
  $(title).text("Sign Up");

  // Reset any entries into the login form
  $(signInEmail).val("");
  $(signInPassword).val("");
  $(loginError).hide();
  $(bandName).focus();
});


// Handles swapping to sign in page
$(linkToSignIn).click(function(){
  // Hide the sign up form and show the login form
  $(signUpForm).hide();
  $(loginForm).fadeIn(500);
  $(modalBox).css("height", 380);
  $(title).text("Welcome");

  // Reset any entries into the sign up form
  $(bandName).val("")
  $(signUpEmail).val("");
  $(signUpPassword).val("");
  $(confirmPassword).val("");
  $(signUpError).hide()
  $(signInEmail).focus();
});


// Handles signing in
$(signInBtn).click(function(){
  // Holds the values of the fields
  let email = $(signInEmail).val();
  let password = $(signInPassword).val();

  // Reset the password value after the click
  $(signInPassword).val("");

  // Check for matching account
  $.get(url, function(serverResponse) {
    if(serverResponse.length === 0) {
      console.log("Database is empty");
    }
    // Find the matching email address in the db and get corresponding id
    var found = false
// Find the matching email address in the db and get corresponding id
serverResponse.forEach(function(element) {
  if (element.Email == email && element.Password == password) {
    // Log in the user to the band page here
    console.log("Found the user.");
    $.cookie("username",email);
    window.location.href ="bandpage.html?bandName=" + element.bandName;
    found = true
    return;
  }
});

if (!found) {
  $(loginError).text("Incorrect email or password");
  $(loginError).show();
}
});
});


// Handles signing up
$(signUpBtn).click(function(){
  // Holds the values of the fields
  let band = $(bandName).val();
  let email = $(signUpEmail).val();
  let password = $(signUpPassword).val();
  let confirmPass = $(confirmPassword).val();

  if (band == "" || email == "" || password == "" || confirmPass == "") {
    $(signUpError).text("All fields must be completed");
    $(signUpError).show();
    return;
  }

  if ( password != confirmPass) {
    $(signUpError).text("Passwords do not match");
    $(signUpError).show();
    return;
  }

  // Reset the password value after the click
  $(signUpPassword).val("");
  $(confirmPassword).val("");

  $.get(url, function(serverResponse) {
    $(signUpError).show();
    // Prevents adding duplicate entries
    var alreadyInDB = false;

    serverResponse.forEach(function(element) {
      // If there is already an email with specified name, deny post
      if (element.Email == email) {
        $(signUpError).text("That email address is taken");
        $(signUpError).show();
        alreadyInDB = true;
        return;
      }

      // If there is already a band with specified name, deny post
      if (element.bandName == band) {
        $(signUpError).text("That band name is taken");
        $(signUpError).show();
        alreadyInDB = true;
        return;
      }
    });

    // Only execute if the entry is not already in the database
    if (!alreadyInDB) {
      $.post(url, {
          bandName: band,
          Email: email,
          Password: password
        },
        function(serverResponse) {
          $(signUpError).hide();
          // Log in the user to the band page here
          //window.location.href = bandPageURL;
          console.log(serverResponse);
        });

      alreadyInDB = false;
    }
  });
});
