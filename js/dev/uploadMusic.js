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
            // Annotations start empty, but should be an array of Annotation objects?
            AudioObject.set('annotations', []);
            AudioObject.save();
            
            console.log('Done uploading ' + recordingName)
            
        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log('error saving file');
        });
    }
}