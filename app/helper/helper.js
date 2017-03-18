function arrayMove(arr, previousIndex, newIndex){
    var b = arr[previousIndex];
    arr[previousIndex] = arr[newIndex];
    arr[newIndex] = b;

    arr.forEach(function (element, index) {
        element.positionList = index;
    });
}

module.exports = arrayMove;