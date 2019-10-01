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

  const statesCheck = {};
  $('.state INPUT').change(function () {
    var $inputStat = $(this);
    if ($inputStat.is(':checked')) {
      statesCheck[$inputStat.attr('data-id')] = $inputStat.attr('data-name');
    } else {
      delete statesCheck[$inputStat.attr('data-id')];
    }
    const strState = [];
    for (const key in statesCheck) {
      strState.push(statesCheck[key]);
    }
    $('.locations h4').text(strState.join());
  });

  const citiesCheck = {};
  $('.city INPUT').change(function () {
    var $inputStat = $(this);
    if ($inputStat.is(':checked')) {
      citiesCheck[$inputStat.attr('data-id')] = $inputStat.attr('data-name');
    } else {
      delete citiesCheck[$inputStat.attr('data-id')];
    }
    const strCity = [];
    for (const key in citiesCheck) {
      strCity.push(citiesCheck[key]);
    }
    $('.locations h4').text(strCity.join());
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data, status) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  function getUser (id) {
    const user = $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/users/' + id,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json'
    });
    return user;
  }

  const dataDict = {};
  $('button').click(function () {
    const amsIds = Object.keys(amsCheck);
    const stsIds = Object.keys(statesCheck);
    const cityIds = Object.keys(citiesCheck);
    dataDict.amenities = amsIds;
    dataDict.states = stsIds;
    dataDict.cities = cityIds;
    $('.places').children().remove('article');
    places(dataDict);
  });

  function places (dt = '{}') {
    return $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dt),
      success: function (data) {
        console.log(data.length);
        $.each(data, async function () {
          const user = await getUser(this.user_id);
          $('.places').append(
            '<article>' +
              '<div class="title">' +
                '<h2>' + this.name + '</h2>' +
                '<div class="price_by_night">' + this.price_by_night + '</div>' +
              '</div>' +
              '<div class="information">' +
                '<div class="max_guest">' +
                  '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
                  '<br />' + this.max_guest + ' Guests' +
                '</div>' +
                '<div class="number_rooms">' +
                  '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
                  '<br />' + this.number_rooms + ' Bedrooms' +
                '</div>' +
                '<div class="number_bathrooms">' +
                  '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
                  '<br />' + this.number_bathrooms + ' Bathroom' +
                '</div>' +
              '</div>' +
              '<div class="user">' +
                '<strong>Owner: ' + user.first_name + ' ' + user.last_name + '</strong>' +
              '</div>' +
              '<div class="description">' +
                this.description +
              '</div>' +
            '</article>'
          );
        });
      }
    });
  }
  places(dataDict);
});
