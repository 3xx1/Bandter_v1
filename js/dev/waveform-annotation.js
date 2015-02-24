/**
 * Create a WaveSurfer instance.
 */
var wavesurfer = Object.create(WaveSurfer);
/**
 * Parse logistics, init, and so on.
 */
var rawData = {};

// Probably these logistics below will be commented out because I will just fetch array from Josh's part.

// "5HMRplZYZA5KFfgGRFNjIk5iUl4GRUJHDJuinu40", "J3Q7R4sojsyHA1CUZPCsDz0evTkCs1KuLgCPjvEi" - Bandter Parse Account Authorization Keys
// Parse.initialize("gUXmz1UDr3xVjmRuCpgi0knEaphIphyj7mRlnlXi", "gsJUjDpTLkdHkqgjOhI9Qfe7a3qU6Wxt1PBLXusU"); // Relace Keys with Bandter ones

/*

var annotationObject = Parse.Object.extend("annotationObject");
var query = new Parse.Query(annotationObject);
var annotationObject = new annotationObject();
annotationObject.id = "YbB4zxaZTt";

query.equalTo("objectId", "YbB4zxaZTt");
query.find({
    success: function(results){
        rawData = results[0].get("logs");
        // alert(results[0].get("logs").annotation);
    },
    error: function(object, error) {
        //
    }
});


*/

/**
 * Init & load.
 */

/* Progress bar */

document.addEventListener('DOMContentLoaded', function () {
    // Init wavesurfer

    wavesurfer.init({
        container: document.querySelector('#waveform'),
        height: 150,
        scrollParent: false,
        fillParent: true,
        normalize: true,
        minimap: false,
        cursorWidth: 2 ,
        waveColor: '#C6C6C6',
        progressColor: '#337AB7',
        cursorColor: '222244',

        // backend: 'AudioElement'
    });

    wavesurfer.initMinimap({
        height: 0,
        waveColor: '#ddd',
        progressColor: '#999',
        cursorColor: '#999'
    });


    // wavesurfer.util.ajax({
    //     responseType: 'json',
    //     url: 'media/rashomon.json'
    // }).on('success', function (data) {
    //     wavesurfer.load(
    //         'media/rooster.mp3' // will be replaced with the actual file path
    //     );
    // });

    // wavesurfer.load(wavesurfer.load('media/msw001_03_rashomon_akutagawa_mt_64kb.mp3');

    /* Regions */
    wavesurfer.enableDragSelection({
        color: 'rgba(20, 180, 120, 1)' // Alpha set to 1 by Josh; Opacity now controlled in css
    });

    wavesurfer.on('ready', function () {
      //loadRegions(annotationGlobal);
      //saveRegions();
        //if (localStorage.regions) {
            // loadRegions(JSON.parse(localStorage.regions));
        // } else {
            // loadRegions(
            //     extractRegions(
            //         wavesurfer.backend.getPeaks(512),
            //         wavesurfer.getDuration()
            //     )
            // );

            // wavesurfer.util.ajax({
            //    responseType: 'json',
            //    url: 'annotations.json'
            //}).on('success', function (data) {
            //    loadRegions(data);
            //   saveRegions();
            //});
            // loadRegions(annotationGlobal);
            // saveRegions();
            // alert("case2");
        // }
        $('#waveform').fadeOut(0);
    });

    // wavesurfer.on('ready', editAnnotation);
    //wavesurfer.on('region-click', function (region, e) {
        // e.stopPropagation();
        // Play on click, loop on shift click
        // e.shiftKey ? region.playLoop() : region.play();
    //});

    wavesurfer.on('ready', loadRegions);
    wavesurfer.on('region-click', editAnnotation);
    wavesurfer.on('region-click', showNote);
    //wavesurfer.on('region-updated', saveRegions);
    //wavesurfer.on('region-removed', saveRegions); // This triggers when clearRegions() is called, cleaning out all of our regions :(
    wavesurfer.on('region-in', function(region, e){
        showNote(region);
    });
    wavesurfer.on('region-play', function (region) {
        region.once('out', function () {
            // wavesurfer.play(region.start);
            // wavesurfer.pause();
        });
    });

    /* Timeline plugin */
    // wavesurfer.on('ready', function () {
    //     var timeline = Object.create(WaveSurfer.Timeline);
    //     timeline.init({
    //         wavesurfer: wavesurfer,
    //         container: "#wave-timeline"
    //     });
    // });


    /* Toggle play/pause buttons. */
    var playButton = document.querySelector('#play');
    var pauseButton = document.querySelector('#pause');
    wavesurfer.on('play', function () {
        playButton.style.display = 'none';
        pauseButton.style.display = '';
    });
    wavesurfer.on('pause', function () {
        playButton.style.display = '';
        pauseButton.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // used jquery here to add some animations - Josh
    //var progressDiv = document.querySelector('#progress-bar');
    //var progressBar = progressDiv.querySelector('.progress-bar');

    var showProgress = function (percent) {
        $('#progress-bar').fadeIn(200);
        //progressDiv.style.display = 'block';
        $('.progress-bar').css("width", percent + '%'); 
        //progressBar.style.width = percent + '%';
        //if(percent>99) hideProgress();
    };

    var hideProgress = function () {
        $('#progress-bar').fadeOut(0);
        //progressDiv.style.display = 'none';
    };

    wavesurfer.on('loading', showProgress);
    wavesurfer.on('ready', hideProgress);
    wavesurfer.on('destroy', hideProgress);
    wavesurfer.on('error', hideProgress);
});


/**
 * Save annotations to localStorage.
 */
function saveRegions() {
    regionData = Object.keys(wavesurfer.regions.list).map(function (id) {
        var region = wavesurfer.regions.list[id];
        return {
            start: region.start,
            end: region.end,
            data: region.data
        };
    });

    currentBandStructure[currentFolder][currentSong]['annotations'] = regionData;
    currentBand.set('folderStructure', [currentBandStructure]);
    currentBand.save();
}


/**
 * Load regions from localStorage.
 */
function loadRegions() {
    
    $('#waveform').fadeIn(200);

    if (currentBandStructure[currentFolder][currentSong]['annotations'] != null) {
        //regionJson = JSON.parse(currentBandStructure[currentFolder][currentSong]['annotations'])
        annotationData = currentBandStructure[currentFolder][currentSong]['annotations'];
        console.log('loading ' + annotationData.length + ' regions')

        for (var i = 0; i < annotationData.length; i++) {
            var currentRegion = annotationData[i];

            // Adding in regions based on the start / stop time in JSON ...
            wavesurfer.addRegion( {id: i, start: currentRegion.start, end: currentRegion.end, color:'rgba(20, 180, 120, 1)'} )
            // And then manually updating the region data with the data from the JSON
            wavesurfer.regions.list[i].data = currentRegion.data;
        };
    };

    //Ability to style regions which have been selected
    // $(document).mouseup(function (e) {
    //     if (!e.target.classList.contains('wavesurfer-selected')) {
    //         $(".wavesurfer-region").removeClass('waveform-selected');
    //     }
    // });
    // // Must wait for regions to load before style can be applied
    // $(".wavesurfer-region").click(function() {
    //   $(".wavesurfer-region").removeClass('waveform-selected');
    //   $(this).addClass('waveform-selected');
    // });
}


function clearRegions() {
    wavesurfer.regions.clear();
}

/**
 * Extract regions separated by silence.
 */
function extractRegions(peaks, duration) {
    // Silence params
    var minValue = 0.0015;
    var minSeconds = 0.25;

    var length = peaks.length;
    var coef = duration / length;
    var minLen = minSeconds / coef;

    // Gather silence indeces
    var silences = [];
    Array.prototype.forEach.call(peaks, function (val, index) {
        if (val < minValue) {
            silences.push(index);
        }
    });

    // Cluster silence values
    var clusters = [];
    silences.forEach(function (val, index) {
        if (clusters.length && val == silences[index - 1] + 1) {
            clusters[clusters.length - 1].push(val);
        } else {
            clusters.push([ val ]);
        }
    });

    // Filter silence clusters by minimum length
    var fClusters = clusters.filter(function (cluster) {
        return cluster.length >= minLen;
    });

    // Create regions on the edges of silences
    var regions = fClusters.map(function (cluster, index) {
        var next = fClusters[index + 1];
        return {
            start: cluster[cluster.length - 1],
            end: (next ? next[0] : length - 1)
        };
    });

    // Add an initial region if the audio doesn't start with silence
    var firstCluster = fClusters[0];
    if (firstCluster && firstCluster[0] != 0) {
        regions.unshift({
            start: 0,
            end: firstCluster[firstCluster.length - 1]
        });
    }

    // Filter regions by minimum length
    var fRegions = regions.filter(function (reg) {
        return reg.end - reg.start >= minLen;
    });

    // Return time-based regions
    return fRegions.map(function (reg) {
        return {
            start: Math.round(reg.start * coef * 10) / 10,
            end: Math.round(reg.end * coef * 10) / 10
        };
    });
}


/**
 * Random RGBA color.
 */
function randomColor(alpha) {
    return 'rgba(' + [
        ~~(Math.random() * 255),
        ~~(Math.random() * 255),
        ~~(Math.random() * 255),
        alpha || 1
    ] + ')';

}

/**
 * Edit annotation for a region.
 */
 function editAnnotation (region) {

    // Show the annotation form (will be hidden when another recording loads)
    // The .hide() call is in loadWaveform
    // Show the annotation form (will be hidden when another recording loads)
    // The .hide() call is in loadWaveform
    var target;
    target = document.getElementById('subtitle');
    target.innerHTML = '';

    // Show the annotation form (will be hidden when another recording loads)
    // The .hide() call is in loadWaveform
    // $("#annotation").show();
    $('#annotation').fadeIn(200);
    $( "#note" ).focus();

     var form = document.forms.edit;
     form.style.opacity = 1;
     form.elements.start.value = Math.round(region.start * 10) / 10,
     form.elements.end.value = Math.round(region.end * 10) / 10;
     // form.elements.note.value = region.data.note || '';
     form.elements.note.value = '';
     // var noteVal = ;
     // var accountVal = region.data.account;
     //noteVal[noteVal.length] = form.elements.note.value;
     //accountVal[accountVal.length] = "kaz";
     var notation = region.data.note || '';
     var accountNote = region.data.account || '';
     var timeStamp = region.data.timeStamp || '';
     var timeStmp = new Date();

     form.onsubmit = function (e) {
         e.preventDefault();
         annotationNotes = notation.split("|");
         region.update({
             start: form.elements.start.value,
             end: form.elements.end.value,
             data: {
                 "timeStamp": timeStamp + '|' + timeStmp,
                 "note": notation + "|" + form.elements.note.value,
                 "account": accountNote + "|" + currentUser.get('username')                  //replace here with actual account name
             }
         });
         timeStamp = timeStamp + '|' + timeStmp;
         notation = notation + '|' + form.elements.note.value;
         accountNote = accountNote + '|' + currentUser.get('username');
         // form.style.opacity = 0;
         showNote(region);
         form.elements.note.value='';
         // Save once submitted
         saveRegions();
     };
     form.onreset = function () {
         // form.style.opacity = 0;

         // form.dataset.region = region.id;
         timeStamp = timeStamp + '|' + timeStmp;
         notation = notation + '|' + form.elements.note.value;
         accountNote = accountNote + '|' + currentUser.get('username');
         // saveRegions();
         showNote(region);

         form.elements.note.value = '';
         // form.style.opacity = 0;
         // Unsure if this is needed here -Josh
         saveRegions();
         //$("#annotation").hide();
         $('#annotation').fadeOut(200);
         console.log("helloHerer");
     };

     // Below code commented out - not sure what this does
     // Was wondering why there are 2 .onreset functions?? - Josh
     // ------------ V ----------------
     // form.onreset = function () {
     //     form.style.opacity = 0;
     //     form.dataset.region = null;
     // };
     form.dataset.region = region.id;

 }


/**
 * Display annotation.
 */
function showNote (region) {
    console.log(region)
    var target;
    target = document.getElementById('annotation');
    if (!showNote.el) {
        showNote.el = document.querySelector('#subtitle');
    }
    showNote.el.innerHTML = '';

    // Update title of box to the timestamp of the region
    var beginningMinutes = Math.floor(region.start/60);
    var beginningSeconds = Math.floor(region.start - beginningMinutes * 60);

    var endMinutes = Math.floor(region.end/60);
    var endSeconds = Math.floor(region.end - endMinutes * 60);

    $("#annotationTitle").text(beginningMinutes + ':' + beginningSeconds + ' - ' + endMinutes + ':' + endSeconds);

    var dur = wavesurfer.getDuration();
    var wid = wavesurfer.drawer.wrapper.scrollWidth;
    target.style.left = (region.start / dur * wid + 'px');
    var antNotes = region.data.note.split("|");
    var antUsers = region.data.account.split("|");
    var antTimes = region.data.timeStamp.split("|");
    // console.log(antNotes.length);
    var printNote = "";

    for(var i=1; i<antNotes.length; i++)
    {
      //var sourceimg = 'media/' + antUsers[i] + '.jpg';
      var sourceimg = currentBandPortraits[antUsers[i]];
      // Set new date object from the one saved in database; this will be converted to look nice with the timeago() library
      var timeStampDate = new Date(antTimes[i]);

      printNote += '<div class="annotationContainer">';
      printNote += '<div class="annotationUserImageContainer"> <img class="annotationUserImage" border="0" src="' + sourceimg + '" width="30" height="30" alt="no image found :("> </div>';
      printNote += '<div class="annotationUserName">' + antUsers[i] + '</div>';
      printNote += '<div class="annotationDelete" onclick="removeComment(' + region.id + ', ' + i + ')"> x </div>';
      printNote += '<div class="annotationTimeStamp">' + jQuery.timeago(timeStampDate) + '</div>';
      printNote += '<div class="annotationText"> ' + antNotes[i] + '</div>';
      printNote += '</div>'; // Closing div for "annotationContainer"
    }

    //target.style.borderColor = 'rgba(20, 180, 120, 0.1)';
    showNote.el.innerHTML = printNote;
    //$("#annotation").show();
    $('#annotation').fadeIn(200);
}

// Removes an individual comment from a thread
function removeComment(regionIdString, commentIndex) {
    // Find the region based on its ID string
    var regionID = parseInt(regionIdString);
    var currentRegion = wavesurfer.regions.list[regionID]

    var antNotes = currentRegion.data.note.split("|");
    var antUsers = currentRegion.data.account.split("|");
    var antTimes = currentRegion.data.timeStamp.split("|");

    // Create new arrays to hold the remaining comment data
    var newNotes = [];
    var newUsers = [];
    var newTimes = [];

    // Go through each annotation, and only add the ones which are not the deleted comment to the new list
    for(var i=1; i<antNotes.length; i++) {
        if (i != commentIndex) {
            newNotes.push(antNotes[i]);
            newUsers.push(antUsers[i]);
            newTimes.push(antTimes[i]);
        };
    }
    // Reset the data of the current region to match the new arrays (which does not include the deleted comment)
    currentRegion.data.note = '|' + newNotes.join("|");
    currentRegion.data.account = '|' + newUsers.join("|");
    currentRegion.data.timeStamp = '|' + newTimes.join("|");

    // Update the view and save the region info
    showNote(currentRegion);
    saveRegions();
}

/**
 * Bind controls.
 */
GLOBAL_ACTIONS['delete-region'] = function () {
    var form = document.forms.edit;
    var regionId = form.dataset.region;
    if (regionId) {
        wavesurfer.regions.list[regionId].remove();
        form.reset();
    }

    // Make sure to save after the deletion!
    saveRegions();
};

GLOBAL_ACTIONS['export'] = function () {
    window.open('data:application/json;charset=utf-8,' +
        encodeURIComponent(localStorage.regions));
    /*
    annotationObject.save(null, {
        success: function(annotationObject){
            var data = JSON.parse(localStorage.regions);
            // console.log(data[0].start);
            // console.log(data[1].end);
            // console.log(data[2].data[0]);

            annotationObject.set("logs", data);
            annotationObject.save();
            // alert("saved!!");
            localStorage.clear();
        }
      })
      */
      // localStorage.clear();
};
