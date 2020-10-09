
let arrLength;
let reactor;


const maxHeap = async (arr, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if (left < arrLength && arr[left] > arr[max]) {
        max = left;
    }

    if (right < arrLength && arr[right] > arr[max]) {
        max = right;
    }

    if (max != i) {
        await swap(arr, i, max);
        await maxHeap(arr, max);
    }
}

const swap = async (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    await new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, 500)
    );
    await reactor.dispatchEvent("swap", { index1, index2});

}

const heapSort = async (arr, react) => {
    arrLength = arr.length;
    reactor = react;
    for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
        await maxHeap(arr, i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
        await swap(arr, 0, i)
        arrLength--
        await maxHeap(arr, 0)
    }
    return arr;
}

export default heapSort;