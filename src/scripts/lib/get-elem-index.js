// given child element, return index of parent
export function getElemIndex(el){
    const p = el.parentNode;
    const c = p.children;
    let i = c.length - 1;
    for (; i >= 0; i--){
        if (el == c[i]){
            break;
        }
    }
    return i;
};