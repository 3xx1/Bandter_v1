



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

document.addEventListener('DOMContentLoaded', function () {
	if (currentUser) {
	    // do stuff with the user
	    //console.log(currentUser.get('username'))
	    loginScreenToMainScreen();
	} else {
		$("#login-username").focus();
	};
});

function login() {
 	var username = $("#login-username").val();
 	var password = $("#login-password").val();

 	Parse.User.logIn(username, password, {
	  success: function(user) {
	    // Do stuff after successful login.
	    currentUser = user;
	    
	    loginScreenToMainScreen();

	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("Error logging in!")
	  }
	});
}


function signOut() {
	Parse.User.logOut();

	// Show the rest of the app
    $("#logged-in-body").hide();
    // Hide the login screen
    $("#not-logged-in-body").show();
    
    // Set the text on the navbar, and show the navbar items
    $("#welcome-username").text("");
    $("#navbar-items").hide();	

    $("#login-username").focus();
}


function loginScreenToMainScreen() {
	var username = currentUser.get('username');

    // Hide the login screen
    $("#annotation").hide();
    $("#not-logged-in-body").hide();
    // Show the rest of the app
    $("#logged-in-body").show();
    // Set the text on the navbar, and show the navbar items
    $("#welcome-username").text("Welcome " + username);
    $("#navbar-items").show();
    // get nav items 
    getNavItems();
}