



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


	    $("#not-logged-in-body").hide();
	    $("#logged-in-body").show();

	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert(error)
	  }
	});
}