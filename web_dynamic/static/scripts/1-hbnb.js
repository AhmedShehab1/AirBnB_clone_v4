$(document).ready(function () {
  const checkedCheckBoxes = {};
  const checkedItems = [];
  const $amenitiesHeader = $('.amenities h4');

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
});
