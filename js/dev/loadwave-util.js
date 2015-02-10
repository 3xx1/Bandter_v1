

function loadWaveform(url) {
  // First clear old regions
  clearRegions();

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