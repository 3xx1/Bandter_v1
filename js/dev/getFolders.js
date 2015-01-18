

// Function is called on page load to get all the folders (and recordings within the folders) as sidebar nav items
// There is probably a different approach that needs to be used so this entire function may need to be removed or rewritten
function getFolders() {
  var Folder = Parse.Object.extend("Folder");
  var folderQuery = new Parse.Query(Folder);
  // Below line indicates that we need to include the elements inside the "recordings" array in our query.
  // This makes it so that we can later use .get() on the objects pointed to by this array, in order to
  // display these recordings in the navbar
  folderQuery.include("recordings");

  folderQuery.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " folders.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var folder = results[i];
        // Append an li to the sidebar, containing the name of the folder
        $("#folderList").append('<li><a href="#"> ' + folder.get('name') + ' (folder) </a></li>');

        // Loop through all files in the folder and display them
        var recordings = folder.get('recordings');
        for (var j = 0; j < recordings.length; j++) {
          var recording = recordings[j];
          // Temporary code to add the recording name as a link on the navbar. There is probably a much more elegant and useful way to do this.
          $("#folderList").append('<li><a href="#"> -- ' + recording.get('recordingName') + '</a></li>');
        }

      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}