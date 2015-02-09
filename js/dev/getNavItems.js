

// Global variable storing the current band. This should be accessible from anywhere
var currentBand = null;
var currentBandStructure = null;
var currentSongUrl = null;

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
        currentBand = results[i];
        currentBandStructure = currentBand.get("folderStructure")[0];

        $("#bandSelect").append('<option value="' + currentBand.id + '"> ' + currentBand.get("name") + '</option>');
        $("#folderList").append('<li><a href="#"> ' + currentBand.get("name") + '</a></li>');

        // Grab the folder: recordings key/value pair in the JSON
        $.each(currentBandStructure, function(folder, recordings) {
          console.log('Folder: ' + folder + '  Recordings: '+ recordings);
          $("#folderList").append('<li><a href="#"> ' + folder + '</a></li>');

          // Grab the recording: info key/value pair
          $.each(recordings, function(recording, info) {
            console.log('Recording Name: ' + recording + '  Info: '+ info);

            // Add the file URL to an onclick function so that this can be loaded later
            url = info['audioFile'];
            $("#folderList").append('<li onclick=loadWaveform("' + url + '") >' + recording + '</li>');

            currentSongUrl = info['audioFile'];
          });
        // End folder: recording (below)
        });
      // End loop through query results (below)
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}
