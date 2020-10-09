
import bubbleSort from "./algorithms/bubbleSort.js";
import heapSort from "./algorithms/heapSort.js";
import quickSort from "./algorithms/quickSort.js";
import selectionSort from "./algorithms/selectionSort.js";

import Reactor from "./eventSystem.js";

let arr = [];
let size;
let container;
let reactor;
let methods;
let slider;
let btnSort;

let sorting = bubbleSort;


window.onload = (e) => {
    console.log("Window loaded");
    reactor = new Reactor();
    reactor.registerEvent("swap");
    reactor.addEventListener("swap", async (args) => {
        let index1 = args.index1;
        let index2 = args.index2;
        await swap(index1, index2);
        //await swap(0, 9);
    });
    container = document.querySelector("#arrayContainer");
    slider = document.querySelector("#sldSize");
    size = +slider.value;
    slider.addEventListener("input", changeSize);
    btnSort = document.querySelector("#sort");
    btnSort.addEventListener("click", sort);
    methods = document.querySelectorAll(".topnav > div");
    methods.forEach(x => x.addEventListener("click", (ev) => changeMethod(ev.target)));
    generateArr(size);
}

const changeMethod = (element) => {
    console.log("change");
    methods.forEach(x => x.classList.remove("selected"));
    element.classList.add("selected");
    generateArr(size);
    console.log(element.getAttribute("--data-name"))
    switch (element.getAttribute("--data-name")) {
        case "bubbleSort":
            sorting = bubbleSort;
            break;
        case "heapSort":
            sorting = heapSort;
            break;
        case "quickSort":
            sorting = quickSort;
            break;
    }
}

const generateArr = (size) => {
    clearArr();
    console.log("Generate arr with size " + size);
    arr = [...Array(size)].map(() => Math.floor(Math.random() * 250 + 10));
    console.log(arr);
    showArr();
}

const changeSize = (e) => {
    size = +e.target.value;
    generateArr(size);
}

const sort = async () => {
    slider.disabled = true;
    btnSort.disabled = true;
    let sorted = await sorting(arr, reactor);
    await sleep(750);
    let elements = document.querySelectorAll(".array-element");
    for (let i = 0; i < elements.length; i++) {
        setTimeout(() => elements[i].classList.add("finished"), 100 * i + 1);
    }
    console.log(sorted);
    slider.disabled = false;
    btnSort.disabled = false;
}

const showArr = () => {
    for (let i = 0; i < arr.length; i++) {
        let elem = document.createElement("div");
        elem.style.height = arr[i] * 3 + "px";
        elem.classList.add("array-element");
        if(arr.length < 28) {
            let text = document.createElement("div");
            text.appendChild(document.createTextNode(arr[i]));
            elem.appendChild(text);
        }
        container.appendChild(elem);
    }
}

const clearArr = () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


const swap = (index1, index2) => {
    console.log(index1);
    console.log(index2);
    return new Promise(async resolve => {
        let elem1 = document.querySelectorAll(".array-element")[index1];
        let elem2 = document.querySelectorAll(".array-element")[index2];

        // const style1 = window.getComputedStyle(elem1);
        // const style2 = window.getComputedStyle(elem2);

        // const transform1 = style1.getPropertyValue("transform");
        // const transform2 = style2.getPropertyValue("transform");

        // elem1.style.transform = transform2;
        // elem2.style.transform = transform1;

        // window.requestAnimationFrame(() => {
        //     setTimeout(() => {
        //         container.insertBefore(elem2, elem1);
        //         resolve();
        //     }, 50);
        // })
        let delay = 500;


        var div1rect = elem1.getBoundingClientRect();
        var div2rect = elem2.getBoundingClientRect();

        // get div1's center point
        var div1x = div1rect.left + div1rect.width / 2;
        var div1y = div1rect.top + div1rect.height / 2;

        // get div2's center point
        var div2x = div2rect.left + div2rect.width / 2;
        var div2y = div2rect.top + div2rect.height / 2;

        // calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
        var distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
        //var distance = Math.sqrt(distanceSquared);
        var distance = div2x - div1x;

        //console.log(distance)

        elem1.style.setProperty("--distance", distance + "px");
        elem2.style.setProperty("--distance", -distance + "px");

        // elem1.setAttribute('style', `transform: translate(${distance}px, 0px); background-color: palegoldenrod; transition: background-color ${delay}ms, transform ${delay}ms`);
        // elem2.setAttribute('style', `transform: translate(-${distance}px, 0px); background-color: palegoldenrod; transition: background-color ${delay}ms, transform ${delay}ms`);
        elem1.classList.add("moving");
        elem2.classList.add("moving");
        await sleep(delay);

        var temp = document.createElement("div");
        elem1.parentNode.insertBefore(temp, elem1);

        // move obj1 to right before obj2
        elem2.parentNode.insertBefore(elem1, elem2);

        // move obj2 to right before where obj1 used to be
        temp.parentNode.insertBefore(elem2, temp);

        // remove temporary marker node
        temp.parentNode.removeChild(temp)
        //container.children[index2].after(container.children[index1]);

        elem1.classList.remove("moving");
        elem2.classList.remove("moving");

        // elem1.removeAttribute("style");
        // elem2.removeAttribute("style");

    })
}

let sleep = (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay));
}



