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
});
