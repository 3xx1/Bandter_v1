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
            
            AudioObject.set('file', parseFile);
            AudioObject.set('recordingName', name);
            AudioObject.set('annotations', []);
            AudioObject.save();
            
            console.log('Done')
            
        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log('error saving file');
        });
    }
}