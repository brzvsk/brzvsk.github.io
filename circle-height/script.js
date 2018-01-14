

$(function() {
    $('input').on('hange keydown paste input', function(e) {
        var d = $('input#diameter').val();
        var hor = $('input#horda').val();
        
        var val = d/2 * (Math.cos((Math.PI/180)*Math.asin((Math.PI/180)*hor/d)));
        
        $('div#result').html(val);
    });

});