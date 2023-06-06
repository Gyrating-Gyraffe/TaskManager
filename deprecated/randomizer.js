function fillFormRandomly(formData) {
    formData[0].value = generateRandomParagraph(254);
    formData[1].value = `${randomNumber(2023, 4)}-${randomNumber(12, 2)}-${randomNumber(28, 2)}`;
    formData[2].value = `${randomNumber(23, 2)}:${randomNumber(59, 2)}`;
}

function generateRandomParagraph(length) {
    const characters = ' ABCD EFGH IJKL MNOP QRST UVWX YZab cdef ghij klmn opqr stuv wxyz ';
    let paragraph = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      paragraph += characters[randomIndex];
    }
  
    return paragraph;
  }

  function randomNumber(max, length) {
    const randomValue = Math.floor(Math.random() * max + 1);
    // Pad the random number with leading 0's. (EX: 7 becomes 07 with length=2 or 0007 with length=4);
    return randomValue.toString().padStart(length, '0');
  }

  /*
he specified value "2/3/1309" does not conform to the required format, "yyyy-MM-dd".
fillFormRandomly @ randomizer.js:3
(anonymous) @ main.js:51
randomizer.js:4 The specified value "1:56 AM" does not conform to the required format.  The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999.


  */