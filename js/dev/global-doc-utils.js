


// Trying to work out a function to hide the annotations window when it is clicked out of

// $(document).mouseup(function (e) {
//     var container = $("YOUR CONTAINER SELECTOR");

//     if (!container.is(e.target) // if the target of the click isn't the container...
//         && container.has(e.target).length === 0) // ... nor a descendant of the container
//     {
//         container.hide();
//     }
// });

$(document).ready(function(){
    $('#note').keypress(function(e){
      if(e.which == 13){
      		// Prevent default of newline
      		e.preventDefault();

           $('#annotationSubmitForm').submit();
       }
    });
});
