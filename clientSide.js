$(document).ready(function() {
    var colors = ['blue', 'green', 'yellow', 'red', 'orange', 'pink',
                  'gray', 'purple', 'brown'];
    var myColor = colors[Math.floor(Math.random()*colors.length)];

    $('#submit').click(function() {
        $.ajax({
            type: 'POST',
            url: '/say',
            data: {msg: $('#msg').val(),
                   color: myColor}
        });
    });

    setTimeout(function() { longPollForMsgsSince(0); }, 10);
});

function longPollForMsgsSince(time) {
    $.ajax({
        url: '/msg-wait?since=' + time,
        dataType: 'json',
        error: function(xhr, status, error) {
            console.log('XHR failed: status=' + status,
                ', error=' + error);
            console.log('Retrying in 10sec...');
            setTimeout(function() { longPollForMsgsSince(time); }, 10000);
        },
        success: function(data) {
            if (!data.messages || data.messages.length < 1) {
                // Timed out with no new messages. Long poll again.
                setTimeout(function() { longPollForMsgsSince(time); }, 0);
            } else {
                data.messages.forEach(function(msg) {
                    var newMsgHtml = '<p style="color: ' + msg.color +
                        '">' + msg.text + '</p>';
                    $('#chat-buffer').append(newMsgHtml);
                });
                setTimeout(function() {
                    longPollForMsgsSince(data.messages.pop().time);
                }, 0);
            }
        }
    });
}
