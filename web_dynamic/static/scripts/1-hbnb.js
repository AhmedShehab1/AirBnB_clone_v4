$(document).ready(function() {
    const checkedCheckBoxes = {};
    let checkedItems = [];
    const $amenitiesHeader = $('.amenities h4');

    $(':checkbox').click(function () {
        let amenityName = $(this).attr('data-name');
        let amenityId   = $(this).attr('data-id');
        if ($(this).prop('checked')) {
            checkedItems.push(amenityName);
            checkedCheckBoxes[amenityName] = amenityId;
        }
        else {
            delete checkedCheckBoxes[amenityName];
            idx = checkedItems.indexOf(amenityName);
            checkedItems.splice(idx, 1);
        }
        $amenitiesHeader.text(checkedItems.join(', '));
    })
});