$(document).ready(function () {
  const amsCheck = {};
  $('.amenities INPUT').change(function () {
    var $input = $(this);
    if ($input.is(':checked')) {
      amsCheck[$input.attr('data-id')] = $input.attr('data-name');
    } else {
      delete amsCheck[$input.attr('data-id')];
    }
    const str = [];
    for (const key in amsCheck) {
      str.push(amsCheck[key]);
    }
    $('.amenities h4').text(str.join());
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data, status) {
    if (status === 'success') {
      $('DIV#api_status').addClass('available');
      console.log('OK');
    } else {
      $('DIV#api_status').removeClass('available');
      console.log('BAD');
    }
  });
});
