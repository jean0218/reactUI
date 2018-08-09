export default function mergeList(currentPage, list, renderList) {
    let mergeList = [],
        listLen = list.length;
    if (listLen > 0) {
        if (currentPage === 1) { //判断是否是第一页 
            mergeList = list;
        } else {
            mergeList = renderList.concat(list);
        }
    } else if (listLen == 0) {
        if (currentPage === 1) { //判断是否是第一页 
            mergeList = list;
        } else {
            mergeList = renderList;
        }
    }
    return mergeList;
}