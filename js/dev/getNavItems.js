

// Global variable storing the current band. This should be accessible from anywhere
var currentBand = null;
var currentBandMembers = null;
var currentBandPortraits = null;
var currentBandStructure = null;
var currentFolder = null;
var currentSong = null;
var currentSongUrl = null;

// Get all the bands (and folders within the bands) as sidebar nav items
function getNavItems() {
  var Band = Parse.Object.extend("Band");
  var bandQuery = new Parse.Query(Band);
  // Temporarily limiting this to a particular band
  // Will eventually need to grab the current logged in user and all bands they're a part of
  bandQuery.equalTo("objectId", "h54TtHZGZ5");

  bandQuery.find({
    success: function(results) {
      //console.log("Successfully retrieved " + results.length + " bands.");
      for (var i = 0; i < results.length; i++) {
        currentBand = results[i];
        currentBandMembers = currentBand.get('members');

        currentBandPortraits = {};

        for (var i = 0; i < currentBandMembers.length; i++) {
          username = currentBandMembers[i];
          getPortrait(username);
        }

        currentBandStructure = currentBand.get("folderStructure")[0];
        // Empty the nav items so that this can be called again without doubling the length of the nav 
        $("#bandSelect").empty();
        $("#folderList").empty();

        $("#bandSelect").append('<option value="' + currentBand.id + '"> ' + currentBand.get("name") + '</option>');
        $("#folderList").append('<li><a href="#"> ' + currentBand.get("name") + '</a></li>');

        // Grab the folder: recordings key/value pair in the JSON
        $.each(currentBandStructure, function(folder, recordings) {
          //console.log('Folder: ' + folder + '  Recordings: '+ recordings);
          $("#folderList").append('<li><a href="#"> <i class="fa fa-folder-open-o"></i> ' + folder + '</a></li>');

          // Grab the recording: info key/value pair
          $.each(recordings, function(recording, info) {
            //console.log('Recording Name: ' + recording + '  Info: '+ info);

            // Add the file URL to an onclick function so that this can be loaded later
            url = info['audioFile'];
            $("#folderList").append('<li onclick=loadWaveform("' + url + '") > ' + recording + ' <span class="deleteAudio" onclick=deleteAudioFile("' + url + '") > <i class="fa fa-times"></i> </span> </li>');

            currentFolder = folder;
            currentSong = recording;
            currentSongUrl = info['audioFile'];

          });
        // End folder: recording (below)
        });
      // End loop through query results (below)
      }
    // By default, load whatever the last song is
    loadWaveform(currentSongUrl)
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}


// Function to cache portraits for all users in the current band
function getPortrait (username) {
    
    var portraitQuery = new Parse.Query(Parse.User);
    var portraitUrl = null;
    // Temporarily limiting this to a particular band
    // Will eventually need to grab the current logged in user and all bands they're a part of
    portraitQuery.equalTo("username", username);

    portraitQuery.find({
        success: function(results) {
            user = results[0];
            portraitUrl = user.get('portrait')['_url']; 
            //console.log(portraitUrl);
            currentBandPortraits[username] = portraitUrl;
        },
        error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
        }
    });
}