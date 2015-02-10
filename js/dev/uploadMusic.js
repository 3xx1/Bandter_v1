function showUploadForm() {
    // Folder name defaults to today's date
    var d = new Date();
    var folderName = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + ' jam';
    var recordingName = $("#musicFileUpload")[0].files[0].name;

    // Naive way to remove last 4 characters of filename by default
    if (recordingName.length > 4) {
        recordingName = recordingName.substring(0, recordingName.length - 4);
    }
    // Band temporary way to reveal the hidden div. This input method will need to be reworked,
    // and maybe end up as a modal or even separate page to support uploading many files at once
    $("#nameUploadFile")[0].className = "";
    // The text input fields receive a default name
    $("#recordingName")[0].value = recordingName;
    $("#recordingFolderName")[0].value = folderName;
}

function uploadMusic() {
    var fileUploadControl = $("#musicFileUpload")[0];
    var recordingName = $("#recordingName")[0].value;
    var recordingFolderName = $("#recordingFolderName")[0].value;
    var band_id = $("#bandSelect").val();

    $('#loadingStatus').append('<i class="fa fa-circle-o-notch fa-spin"></i> Uploading ' + recordingName);
    //console.log('Band ID = ' + band_id);

    // TODO - handle multiple file uploading
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = fileUploadControl.files[0].name;
        // Create instance of Parse's File object
        var parseFile = new Parse.File(name, file);

        parseFile.save().then(function() {
            // In order to get access to the File, we must create
            // an object linking to the uploaded file
            var AudioObject = Parse.Object.extend("AudioObject");
            var AudioObject = new AudioObject();

            AudioObject.set('file', parseFile);
            // Set the recording name as whatever is in the associated text input box
            AudioObject.set('recordingName', recordingName);

            AudioObject.save();

            // Create a new folder in the band's structure tree
            updateJsonForNewUpload(currentBand, currentBandStructure, recordingFolderName, recordingName, AudioObject);

            console.log('Done uploading ' + recordingName)
            
            // Remove the loading sign on the div
            $('#loadingStatus').empty();
            
            getNavItems();
            // Hide the file name input form
            //$("#nameUploadFile")[0].className = "hidden";

        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log('error saving file');
        });
    }
}


function updateJsonForNewUpload(band, bandStructure, folderName, recordingName, AudioObject) {
    // Get the url of the file
    url = AudioObject.get('file')['_url'];

    // Need to create an empty structure if the folderName doesn't exist yet
    if (folderName in bandStructure) {
        bandStructure[folderName][recordingName] = {"audioFile": url};
    } else {
        bandStructure[folderName] = {};
        bandStructure[folderName][recordingName] = {"audioFile": url};
    };

    band.set("folderStructure", [bandStructure]);
    band.save();
}
