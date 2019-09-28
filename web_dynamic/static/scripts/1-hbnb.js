$(document).ready(function (){
    let ams_check = {};
    $("INPUT")
        .change(function () {
            var $input = $(this);
            if ($input.is(":checked")){
                ams_check[$input.attr("data-id")]=$input.attr("data-name");
            } else {
                delete ams_check[$input.attr("data-id")];
            }
        });
})
