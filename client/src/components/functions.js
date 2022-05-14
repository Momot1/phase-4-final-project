export function addZeros(num){
    return num.toFixed(Math.max(((num+'').split(".")[1]||"").length, 2))
}

