/*
 Greg Koenig
 Visual Frameworks 1302
*/

var parseForm = function(data){
    console.log(data);
};


$(document).ready(function(){
    
    var boardform = $('#boardform'),
        errorlink = $('#errorlink')
    ;
    boardform.validate({
        invalidHandler: function(form, validator){
            errorlink.click();
            var html='';
            for (var key in validator.submitted){
                var label = $('label[for^="' + key +'"]').not('[generated]');
                var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                var fieldName = legend.length ? legend.text() : label.text();
                html += '<li>' + fieldName + '</li>';
            };
            $("#errors ul").html(html);
        },
        submitHandler: function() {
            var data = boardform.serializeArray();
            parseForm(data);
        }
    });

});