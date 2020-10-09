
const bubbleSort = async (arr, reactor) => {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                await new Promise(resolve =>
                    setTimeout(() => {
                        resolve();
                    }, 500)
                );
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                await reactor.dispatchEvent("swap", { index1: i, index2: i + 1 });
            }
        }
    } while (swapped);
    return arr;
}

export default bubbleSort;