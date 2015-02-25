(function ($) {
  var AppRouter = Parse.Router.extend({
    //Routes tell the app what to do
    routes:{
      "bands/:band/:folder/:recording":"recordingDisplay",
      "users/:username":"userDisplay",
      "*page":"defaultAction" //This simply matches any urls that weren't caught above and assigns it to "page"
    },
    
    defaultAction:function (page) {
      if (page) {
      //Once the default action is called we want to construct a link to our restful service
      //var restfulPageUrl = this.restfulUrl + page + 'page'; //http://api.openkeyval.org/gangsterpage
      //Now we have a url lets get the data
      //this.loadRestfulData(restfulPageUrl);
      alert("default action")
      }
    },
    
    recordingDisplay: function (band, folder, recording) {
      //Once the default action is called we want to construct a link to our restful service
      //var restfulPageUrl = this.restfulUrl + animal + 'page'; //http://api.openkeyval.org/dogpage
      //Now we have a url lets get the data
      //this.loadRestfulData(restfulPageUrl);
      //$("#bodyContainer").load("recordingViewBody.html");

      bandName = decodeURI(band);
      folderName = decodeURI(folder);
      recordingName = decodeURI(recording);

      //Parse.history.navigate("help/troubleshooting", {trigger: true});
      //alert(folder, recording)

      if (wavesurferLoaded == 0) {
        console.log('test')
        //$( "#waveform" ).load(function() {
          console.log('loaded #waveform')
          setupWavesurfer();
          console.log('Run setupWavesurfer')
          loadWaveform(bandName, folderName, recordingName);
          console.log('Run loadWaveform')
        //});
      } else {
        //setupWavesurfer()
        loadWaveform(bandName, folderName, recordingName);
      };
    },

    // loadUrl:function (pageUrl) {
    //   //Set the content pane to a loading screen
    //   $('#content-pane').text('loading data...');
    //   //Load the data in using jQuerys ajax call
    //   $.ajax({
    //     url:pageUrl,
    //     dataType:'jsonp',
    //     success:function (data) {
    //       //Once we receive the data, set it to the content pane.
    //       $('#content-pane').text(data);
    //     }
    //   });
    // }
  });
    
  new AppRouter;
  //Initiate a new history and controller class
  Parse.emulateHTTP = true;
  Parse.emulateJSON = true;
  Parse.history.start();
  
  })(jQuery);