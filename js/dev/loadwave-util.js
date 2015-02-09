var annotationGlobal;

function loadWaveform(url)
{
  wavesurfer.load(url);
  $.each(currentBandStructure, function(folder, recordings) {
    $.each(recordings, function(recording, info) {
      if(info['audioFile']==url){
        
        $("#recordingName").text(recording);
        $("#recordingFolderName").text('In folder ' + folder);

        clearRegions();
        annotationGlobal = info['annotation0'];
        console.log(annotationGlobal.length);
        wavesurfer.load(url);

        
        // loadRegions(annotationGlobal);
        // saveRegions();
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