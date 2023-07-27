import { useMemo } from "react";

export const DOTS = "...";

export const usePagination = ({
    siblingCount = 1,
    currentPage,
    totalPageCount,
}) => {
    const paginationRange = useMemo(() => {
        // our core logic goes here
        const totalPageNumbers = siblingCount + 5;

        // State 1: if the number of pages is less than the page numbers
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        // calculating the left and right sibling index
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        // check whether we want to show left dots or right dots, or both of them
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // State 2: only right dots to be shown
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        // State 3: only left dots to be shown
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );

            return [firstPageIndex, DOTS, ...rightRange];
        }

        // State 4: Both left and right dots to be shown
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, middleRange, DOTS, lastPageIndex];
        }
    }, [siblingCount, currentPage, totalPageCount]);

    return paginationRange;
};

function range(start, end) {
    const length = end - start + 1;

    return Array.from({ length }, (value, index) => index + start);
}
