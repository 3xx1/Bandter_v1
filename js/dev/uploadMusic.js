function showUploadForm() {
    // Folder name defaults to today's date
    var d = new Date();
    var folderName = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + ' jam';
    // Try to remove last 4 characters of filename - not working for some reason: 
    //var recordingName = document.getElementById("musicFileUpload")[0].files[0].name;
    //recordingName = recordingName.substring(0, recordingName.length - 4);
    document.getElementById("nameUploadFile").className = "";
    document.getElementById("recordingName").value = $("#musicFileUpload")[0].files[0].name;
    //document.getElementById("recordingName").value = recordingName;
    document.getElementById("recordingFolderName").value = folderName;
}

function uploadMusic() {
    var fileUploadControl = $("#musicFileUpload")[0];
    // TODO - handle multiple file uploading
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = fileUploadControl.files[0].name;

        var parseFile = new Parse.File(name, file);

        parseFile.save().then(function() {
            // Must create an object with a reference to the uploaded file in order to access it
            var AudioObject = Parse.Object.extend("AudioObject");
            var AudioObject = new AudioObject();
            
            var recordingName = document.getElementById("recordingName").value;

            AudioObject.set('file', parseFile);
            AudioObject.set('recordingName', recordingName);
            AudioObject.set('annotations', []);
            AudioObject.save();
            
            console.log('Done uploading ' + recordingName)
            
        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log('error saving file');
        });
    }
}