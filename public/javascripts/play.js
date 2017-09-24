function setUsername() {
    var name = $('.nameField').val();
    if(name && name.length > 0) {
        //AJAX to send the name off
        $.post( "/api/setUser", {username: name}, function( res ) {
            if(res && res.valid) {
                //username accepted
                $('nameSetter').slideUp();
            }
            
        });
    } else {
        //They've not entered anything
        alert('enter a valid name');
    }
}