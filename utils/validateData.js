const isCpfValid = (cpf) => {
    let cpfArray = Array.from(cpf, Number)
    const confirmationDigits = cpfArray.slice(-2)
    cpfArray = cpfArray.slice(0, -2)
    const calcDigit = (start=1) => 
        cpfArray.reduce((total, num, index) => 
        {
            total += (num*(index+start)) 
            return total
            //console.log(num+"x"+(start+index)+" = "+(num*(start+index))+" | Total: ",+total);
        }, 0) % 11
    
    const firstDigit = calcDigit()
    if (firstDigit !== confirmationDigits[0]) return false
    cpfArray.push(firstDigit)
    if (calcDigit(0) !== confirmationDigits[1]) return false
    
    return true
}

export default {
    isCpfValid
}