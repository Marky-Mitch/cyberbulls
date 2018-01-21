function addResource(title,text,link) {
    let page = window.location.href;
    page = page.match(/[^\/]*$/)[0];
    $.post( "/api/addResource", {title: title, text: text, link: link, page: page}, function( res ) {
        if(res && res.valid) {
            //username accepted
            alert('Resource info uploaded');
            window.setTimeout(function() {window.location.reload();}, 5000);
        }
        
    });
}

$(function() {
    $('.submitButton').click(function() {
        
        //get info from form
        let title = $('#resourceTitle').val();
        let text = $('#resourceText').val();
        let link = $('#resourceLink').val();
      
        if(title && text && link && title.length > 0 && link.length > 0 && link.length > 0) {
            //we have all the info we need
            
            addResource(title,text,link);
      
        } else {
            alert('Please ensure all boxes are filled in before adding a resource');
        }
    });
});
