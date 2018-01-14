function findGetParam(param) {
    var found;
    window.location.search.substr(1).split("&").forEach(function(item) {
        if (param == item.split("=")[0]) {
            found = item.split("=")[1];
        }
    });
    return found;
}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

$.fn.extend({
   qcss: function(css) {
      return jQuery(this).queue(function(next) {
         jQuery(this).css(css);
         next();
      });
   }
});

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

var input_html = '<input type="text" class="form-control link"/>';

$(function() {
    var params = location.search.substring(1);

    if (params == "") {
        $('.container').show(300);
        for (i = 0; i < $('body').data('link-count'); ++i) {
            $('#links').append(input_html);
        }

        $('#add-btn').on('click', function () {
            $('#links').append(input_html);
        });
        
        $('#min-btn').on('click', function () {
            
        });

        $('#generate-btn').on('click', function () {
            var links = {};
            $('#links .link').each(function(index) {
                var value = $(this).val();

                if (value != "" && validateUrl(value)) {
                    links[value] = 1;
                }
            });

            if ($.isEmptyObject(links)) {
                $('#links h2')
	                    .qcss({'color': 'rgba(255,0,0,.5)'}).delay(100)
	                    .qcss({'color': 'black'}).delay(100)
	                    .qcss({'color': 'rgba(255,0,0,.5)'}).delay(100)
	                    .qcss({'color': 'black'}).delay(100)
	                    .qcss({'color': 'rgba(255,0,0,.5)'}).delay(100)
	                    .qcss({'color': 'black'}).delay(100);
                return;
            }

            var result = window.location.href + '?links=' + encodeURIComponent(btoa(JSON.stringify(links)));

            $('#result-input').val(result);
        });

        $('#links .link').on('change paste', function () {
            if ($(this).val() == "") {
                $(this).css('border-color', '#ccc');
                return;
            }
            if (!validateUrl($(this).val())) {
                $(this).css('border-color', '#ff7777');
            } else {
                $(this).css('border-color', 'green');
            }
        });
        
        $('#copy-btn').on('click', function() {
           window.prompt("Copy to clipboard", $('#result-input').val());
 
        });
    } else {
        var links = $.parseJSON(atob(decodeURIComponent(findGetParam('links'))));
        var link = randomProperty(links);
        window.location.replace(link);
    }

});