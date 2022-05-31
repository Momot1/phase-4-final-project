// Function I was using very often so decided to put it in a seperate file.
export function addZeros(num){
    return num.toFixed(Math.max(((num+'').split(".")[1]||"").length, 2))
}

