$(document).ready(function (){
    let ams_check = {};
    $(".amenities INPUT")
        .change(function () {
            var $input = $(this);
            if ($input.is(":checked")){
                ams_check[$input.attr("data-id")]=$input.attr("data-name");
            } else {
                delete ams_check[$input.attr("data-id")];
            }
            let str =[];
            for (let key in ams_check){
                str.push(ams_check[key]);
            }
            $(".amenities h4").text(str.join());
        })
    });
