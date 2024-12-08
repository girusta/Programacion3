function removeValue(value, arr) {
    const index = arr.indexOf(value);
    if (index > -1) { // only splice array when item is found
    // Removes the value from the original array
        arr.splice(index, 1);
        return true;
    }
    return false;
}