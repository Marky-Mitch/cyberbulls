var username;
function setUsername() {
    let name = $('.nameField').val();
    if(name && name.length > 0) {
        //AJAX to send the name off
        $.post( "/api/setUser", {username: name}, function( res ) {
            if(res && res.valid) {
                //username accepted
                username = name;
                $('.userTitle').html('Playing as ' + escapeHtml(username));
                $('.flagGuesser').removeClass('cloaked');
                $('.nameSetter').slideUp();
                updateScores();
            }
            
        });
    } else {
        //They've not entered anything
        alert('Enter a valid name');
    }
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
function guessFlag() {
    let flag = $('.flagField').val();
    if(flag && flag.length > 0) {
        //AJAX to send the name off
        $.post( "/api/guessFlag", {username: username,guess: flag}, function( res ) {
            if(res && res.valid) {
                //username accepted
                $('.flagField').val('');
                $('.feedbackHeader').html('Correct Guess, score: ' + res.score);
                updateScores();
            } else {
                $('.flagField').val('');
                $('.feedbackHeader').html('Wrong Guess, score: ' + res.score);
                updateScores();
            }
            
        });
    } else {
        //They've not entered anything
        alert('Enter a guess in the box');
    }
}
function updateScores() {
    $.get('/api/sessionScores',function(res) {
        if(res && res.scores) {
            //wipe the scoreboard div
            $('.scoreBoard').html('');
            var htmlToAppend = '';
            htmlToAppend += '<table class="table"><tr class="info"><th>Rank</th><th>User</th><th>Score</th></tr>';
           
            for(var i = 0; i < res.scores.length; i++) {
               htmlToAppend += '<tr><td>' + (i+1) + '</td><td>' + escapeHtml(res.scores[i].username) + '</td><td>' + res.scores[i].score + '</td></tr>';
            }
            htmlToAppend += '</table>';
            $('.scoreBoard').append(htmlToAppend);
        }
    });
}