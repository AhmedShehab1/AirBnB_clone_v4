$(document).ready(function () {
  const checkedCheckBoxes = {};
  const checkedItems = [];
  const $amenitiesHeader = $('.amenities h4');
  const $statusCircle = $('#api_status');
  const $placeSection = $('section.places');

  $(':checkbox').click(function () {
    const amenityName = $(this).attr('data-name');
    const amenityId = $(this).attr('data-id');
    if ($(this).prop('checked')) {
      checkedItems.push(amenityName);
      checkedCheckBoxes[amenityName] = amenityId;
    } else {
      delete checkedCheckBoxes[amenityName];
      const idx = checkedItems.indexOf(amenityName);
      checkedItems.splice(idx, 1);
    }
    $amenitiesHeader.text(checkedItems.join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $statusCircle.addClass('available');
    } else {
      $statusCircle.removeClass('available');
    }
  });

  $.ajax(
    {
      url: 'http://localhost:5001/api/v1/places_search/',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify({}),
      success: data => {
        for (const place of data) {
          displayPlaceArticle(place);
        }
      },
      error: function (xhr, status, error) {

      }
    }
  );
  function displayPlaceArticle (place) {
    const HTMLString = `<article>
<div class="title_box">
    <h2>${place.name}</h2>
    <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
    <div class="max_guest">${place.max_guest} Guests</div>
        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
    </div>
        <div class="description">
    ${place.description}
        </div>
    </article>`;
    $placeSection.append(HTMLString);
  }
});
