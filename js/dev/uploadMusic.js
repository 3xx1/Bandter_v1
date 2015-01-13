function uploadMusic() {
    var fileUploadControl = $("#musicFileUpload")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = fileUploadControl.files[0].name;

        var parseFile = new Parse.File(name, file);

        parseFile.save().then(function() {
            // The file has been saved to Parse.
            var TestMusic = Parse.Object.extend("TestMusic");
            var testMusic = new TestMusic();
            
            testMusic.set('fileReference', parseFile);
            testMusic.save();
            
            console.log('Done')
            
        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log('error saving file');
        });
    }
}