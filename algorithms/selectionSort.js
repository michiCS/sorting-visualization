

const selectionSort = async (arr, reactor) => {
    for(let i = 0; i < arr.length; i++) {
        let min = i;
        for(let j = 0; j < arr.length; j++) {
            if(arr[j] < arr[i]) min = j;
        }
        if(min !== i) {
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, 500)
            );
            [arr[i], arr[min]] = [arr[min], arr[i]];
            await reactor.dispatchEvent("swap", { index1: i, index2: min });
        }
    }
    return arr;
}

export default selectionSort;