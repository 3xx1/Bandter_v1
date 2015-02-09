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
