

function loadWaveform(url) {
  // First clear old regions
  clearRegions();
  
  // Hide the recording length text - this will be filled in when the waveform loads
  $("#displayRecordingLength").text("");
  // Hide the annotation form (will be shown when on a region is clicked)
  $('#annotation').fadeOut(200);

  // Begin loading wavesurfer - on load it will then load the regions (annotations)
  wavesurfer.load(url);

  $.each(currentBandStructure, function(folder, recordings) {
    $.each(recordings, function(recording, info) {
      if(info['audioFile']==url){
        
        $("#displayRecordingName").text(recording);
        $("#displayRecordingFolderName").text('In folder ' + folder);
        
        // Update these globals
        currentFolder = folder;
        currentSong = recording;
        currentSongUrl = info['audioFile'];
      }
    });
  });
}


function deleteAudioFile(url) {
  $.each(currentBandStructure, function(folder, recordings) {
    $.each(recordings, function(recording, info) {
      if(info['audioFile']==url){
        
        delete currentBandStructure[folder][recording];

        // Remove folder if no songs in it
        if (jQuery.isEmptyObject(currentBandStructure[folder])) {
          delete currentBandStructure[folder];
        };

        console.log('Removing ' + recording + ' from ' + folder)
        currentBand.set("folderStructure", [currentBandStructure]);
        
        // Should load nav items only after save
        currentBand.save().then(function() {
          getNavItems();
        });

      }
    });
  });
}


function deleteEntireFolder(folderName) {
  $.each(currentBandStructure, function(folder, recordings) {
    
    console.log('Removing ' + folder)

    if(folderName == folder) {
      delete currentBandStructure[folder];
    };

    currentBand.set("folderStructure", [currentBandStructure]);
    currentBand.save();
  });
}

function hideAnnotation() {
  //$('#annotation').hide();
  $('#annotation').fadeOut(200);
}


function secondsToMinutesAndSeconds(seconds) {
    var minutes = Math.floor(seconds/60);
    var leftoverSeconds = Math.floor(seconds - minutes * 60);

    if (leftoverSeconds < 10) {leftoverSeconds = "0"+leftoverSeconds;}
    var time    = minutes + ':' + leftoverSeconds;
    
    return time;
}

