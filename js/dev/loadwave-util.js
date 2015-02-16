

function loadWaveform(band, folder, recording) {
  // First clear old regions
  clearRegions();
  
  // Hide the annotation form (will be shown when on a region is clicked)
    // The .show() call is in editAnnotation
  $('#annotation').hide();

  // Begin loading wavesurfer - on load it will then load the regions (annotations)
  //wavesurfer.load(url);

  $.each(currentBandStructure, function(c_folder, c_recordings) {
    $.each(c_recordings, function(c_recording, info) {
      //if(info['audioFile']==url){
      if(folder == c_folder && recording == c_recording) {
        
        url = info['audioFile'];
        wavesurfer.load(url);

        $("#displayRecordingName").text(recording);
        $("#displayRecordingFolderName").text('In folder ' + folder);
        
        // Update these globals
        currentFolder = folder;
        currentSong = recording;
        currentSongUrl = url;
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

        getNavItems();

        console.log('Removing ' + recording + ' from ' + folder)
        currentBand.set("folderStructure", [currentBandStructure]);
        currentBand.save();
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