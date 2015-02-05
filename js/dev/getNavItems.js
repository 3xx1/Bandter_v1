

// Global variable storing the current band. This should be accessible from anywhere
var currentBand = null;


// Wrapper function which calls getBands(), which will then call getFolders() 
// Function is called on page load 
function getNavItems() {
  getBands()
}

// Get all the bands (and folders within the bands) as sidebar nav items
function getBands() {
  var Band = Parse.Object.extend("Band");
  var bandQuery = new Parse.Query(Band);
  // Temporarily limiting this to a particular band
  // Will eventually need to grab the current logged in user and all bands they're a part of
  bandQuery.equalTo("objectId", "h54TtHZGZ5")  

  bandQuery.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " bands.");
      for (var i = 0; i < results.length; i++) {
        var band = results[i];

        currentBand = band;

        var structure = band.get("structure");
        var structure_url = structure["_url"];
        // Log grabbing of URL
        console.log("Url of JSON file is " + structure_url);

        $("#bandSelect").append('<option value="' + band.id + '"> ' + band.get("name") + '</option>');

        $("#folderList").append('<li><a href="#"> ' + band.get("name") + ' (band) </a></li>');

        // Go through the JSON file, and for each folder, and recording
        $.getJSON(structure_url, function(data) { 
          
          // Grab the folder: recordings key/value pair in the JSON
          $.each(data, function(folder, recordings) {
            console.log('Folder: ' + folder + '  Recordings: '+ recordings);
            $("#folderList").append('<li><a href="#"> ' + folder + ' (folder) </a></li>');

            // Grab the recording: info key/value pair
            $.each(recordings, function(recording, info) {
              console.log('Recording Name: ' + recording + '  Info: '+ info);
              $("#folderList").append('<li><a href="#"> ' + recording + ' (recording) </a></li>');
            });
          // End folder: recording (below)
          });
        // End loop through JSON file (below)
        });
      // End loop through query results (below)
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}