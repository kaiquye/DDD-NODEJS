

export class ValidateCpfServices {
     execute(document: string) {
        let digitCalculation = 0;
        for (let i = 0; i <= 8; i++) {
            digitCalculation += Number(document[i]) * (10 - i);
        }
        let rest = (digitCalculation * 10) % 11;

        if (rest !== parseInt(document.substring(9, 10))) {
            console.log('invalid document ! ');
            throw new Error("documnet invalid")
        }
        let digitCalculation2 = 0;
        for (let i = 0; i <= 9; i++) {
            digitCalculation2 += Number(document[i]) * (11 - i);
        }
        let rest2 = (digitCalculation2 * 10) % 11;
        if (rest2 != parseInt(document.substring(10, 11))) {
            console.log('invalid document ! ');
            throw new Error("documnet invalid")
        }
    }
}