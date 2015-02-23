



// $("#login-button").click(function() {
// 	alert('too')
// 	$("#login-form").submit();

// });


// $("#login-form").submit( function( event ) {

// 	var email = $("#login-email").val();
// 	var password = $("#login-password").val();


// 	alert( "Handler for .submit() called." + email + password);
// 	event.preventDefault();
// });

var currentUser = null;

function login() {
 	var username = $("#login-username").val();
 	var password = $("#login-password").val();

 	Parse.User.logIn(username, password, {
	  success: function(user) {
	    // Do stuff after successful login.
	    currentUser = user;
	    var username = user.get('username');

	    // Hide the login screen
	    $("#not-logged-in-body").hide();
	    // Show the rest of the app
	    $("#logged-in-body").show();
	    // Set the text on the navbar, and show the navbar items
	    $("#welcome-username").text("Welcome " + username);
	    $("#navbar-items").show();
	    // get nav items 
	    getNavItems();

	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert(error)
	  }
	});
}