
let arr;
let reactor;

const partition = async (left, right) => {
    let pivot = arr[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) {
            if(i !== j) {
                await new Promise(resolve =>
                    setTimeout(() => {
                        resolve();
                    }, 500)
                );
                [arr[i], arr[j]] = [arr[j], arr[i]];
                 await reactor.dispatchEvent("swap", { index1: i, index2: j });
            }
            i++;
            j--;
        }
    }
    return i;
}


const doQuickSort = async (left, right) => {
    let index = await partition(left, right);
    if(left < index - 1) await doQuickSort(left, index - 1);
    if(index < right) await doQuickSort(index, right);

}

const quickSort = async (array, react) => {
    arr = array;
    reactor = react;
    await doQuickSort(0, arr.length - 1);
    return arr;
}

export default quickSort;

