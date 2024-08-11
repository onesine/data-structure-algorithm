import Fibonacci from "@/page/fibonacci.tsx";
import Bubble from "@/page/sort/bubble.tsx";
import Selection from "@/page/sort/selection.tsx";

const PAGES = {
    FIBONACCI: {
        asideText: "Fibonacci",
        path: "/",
        page: Fibonacci
    },
    BUBBLE_SORT: {
        asideText: "Bubble Sort",
        path: "/sort/bubble",
        page: Bubble
    },
    SELECTION_SORT: {
        asideText: "Selection Sort",
        path: "/sort/selection",
        page: Selection
    }
};

export default PAGES;
