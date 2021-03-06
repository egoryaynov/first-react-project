export const calcShowItems = (pages: Array<number>, currentPage: number, pagesToShow: number): Array<number> => {
    if (pages.length === 0) return [];

    const showPages = getShowPages(pages, currentPage, pagesToShow);
    const result = [1, ...showPages, pages.length];

    // Return array of page numbers (first and last page fixed)
    return Array.from(new Set(result));
}

const getShowPages = (pages: Array<number>, currentPage: number, pagesToShow: number): Array<number> => {
    let showPages: Array<number>;
    if (pages.length - currentPage < pagesToShow) {
        showPages = pages.slice(-pagesToShow);
    } else {
        showPages = pages.slice(currentPage - 1, currentPage - 1 + pagesToShow);
    }

    return showPages;
}