let allLetters = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
let openChords = ['E', 'A', 'D', 'G', 'B', 'E']
let priCh;
let triad;
let sus = false;
let xtra = false;
let isMinor = false;
let nope; 
let info;

function MakeCh() {
    let chord = document.querySelector("#mainChord").value;
    let shFl = document.querySelector("#changes").value;
    let minor = document.querySelector("#minor").value;
    let susCh = document.querySelector("#suspended").value;
    let addNum = document.querySelector("#number").value;

    if (shFl != "none") {
        priCh = chord + shFl;
    } else {priCh = chord}

    if (minor == 'minor' && susCh == 'none') {
        isMinor = true;
        nope = false;
        priCh = priCh + 'm';
    } else if (minor == 'minor' && susCh != 'none') {nope = true;
    } else if (minor == 'major') {isMinor = false}

    if (susCh != "none" && minor == 'major') {
        sus = true;
        nope = false;
        priCh = priCh + 'sus' + susCh;
    } else if (susCh != "none" && minor == 'minor') {nope = true;}

    if (addNum != "none" && addNum.includes('M')) {
        xtra = true;
        addNum = addNum[0];
        priCh = priCh + 'maj' + addNum;
    } else if (addNum != "none" && susCh != 'none') {
        xtra = true;
        priCh = priCh +'('+addNum+')';
    } else if (addNum != "none") {
        xtra = true;
        priCh = priCh + addNum;
    }
    
    document.querySelector("#finCh").innerHTML = priCh;
        
}

function drawNotes() {
    if (nope == true) {alert('Cannot have suspended and minor together!\n Please undo any of those!');} 
    let chord = priCh;
    let letter = chord[0];

    // Set first letter
    let firstIn = allLetters.indexOf(letter);
    if (chord.includes("#")) {
        firstIn += 1;
    } else if (chord.includes("b")) {
        firstIn -= 1;
        if (firstIn == -1) {firstIn = allLetters.indexOf('B')}
    }
    let first = allLetters[firstIn];

    // Set third
    let thirdIn = firstIn + 4;
    let third = allLetters[thirdIn];
    if (isMinor == true && sus == false) {
        third = allLetters[thirdIn-1]
    }

    // Set fifth
    let fifthIn = firstIn + 7;
    let fifth = allLetters[fifthIn];

    // Set triad
    let triadList = [first, third, fifth];
    console.log('triadList = '+triadList);


    // Add suspended chords
    if (chord.includes('sus')) {
        sus = true;
        let num = document.querySelector("#suspended").value;
        let addSus = firstIn;
        if (num == 2) {addSus += 2;
        } else if (num == 4) {addSus += 5;
        }
        let suspended = allLetters[addSus];
        console.log("Num taken from list = '"+num+ "' + '" + firstIn +"' = "+addSus+" | Suspended = "+suspended);
        triadList.splice(triadList.indexOf(third), 2);
        triadList.push(suspended);
        triadList.push(fifth);
        console.log('triadList = '+triadList);
    }

    // Add extra notes
    if (chord.includes(2) ||
        chord.includes(4) ||
        chord.includes(6) ||
        chord.includes(7) ||
        chord.includes(9) && xtra == true) {
        let num = document.querySelector("#number").value;
        let addCh = firstIn;
        if (num == 2) {addCh += 2
        } else if (num == '2M') {addCh += 3
        } else if (num == 4) {addCh += 5
        } else if (num == '4M') {addCh += 6
        } else if (num == 6) {addCh += 8
        } else if (num == '6M') {addCh += 9
        } else if (num == 7) {addCh += 10
        } else if (num == '7M') {addCh += 11
        } else if (num == 9) {addCh += 2
        } else if (num == '9M') {addCh += 3
        }

        let number = allLetters[addCh];
        console.log("Num taken from list = "+num+ " | AddNum = "+addCh+" | Suspended = "+number);
        triadList.push(number);
        console.log('Letter to add = '+number)
        console.log('triadList = '+triadList);
    }


    let lastTriad = [];
    for (letter of triadList) {
        if (lastTriad.includes(letter)) {} else {lastTriad.push(letter)}  
        
    } console.log('LastTriad = '+lastTriad);
    

    for (letter of lastTriad) {
        if (letter == lastTriad[0]) {
            triad = letter;
        } else {
            triad += ", "+letter;
        }
    }

    document.querySelector("#chordTriad").innerHTML = triad;
    sessionStorage.setItem('CHORD', lastTriad);
    sessionStorage.setItem('Note', chord);

    // -------------//----------//---------------//-------------//-------------//---------
    
}
 

/* function test () {
    const newTriad = document.getElementById('chordTriad').value;
    sessionStorage.setItem('CHORD', newTriad);
    console.log(newTriad);
    return false;
} */



// function setList() {
    
// }


function printChords() {
    let chord = sessionStorage.getItem('Note');
    let current = sessionStorage.getItem('CHORD');
    let text = "Chord name: "+chord+" - Notes: "+current;
    document.querySelector("#finalChord").innerHTML = text;

    // ---------------------------------
    current += ",";
    let currentList = [];
    // let i = 0; 
    console.log(current+", length: " + current.length);
    let str;
    for (item of current) {
        console.log(item)
        if (item != "," && currentList.length == 0) {
            if (current[1] == '#') { 
                str = item + "#";
                currentList.push(str);
                str = [];
            } else {
                str = item;
            }
            
        } else if (item != "," && item != "#") {
            str += item;
        } else if (item == "#") {
            str += item;
            
        }else {
            currentList.push(str);
            str = [];
        } console.log(str);
    } console.log(currentList);
    // ------------------------------------
    let fret;
    
    let string;
    let string1;
    let string2;
    let string3;
    let string4;
    let string5;
    let string6;

    let frets = 12;
    let position = 1;
    





    /*Iterates through all lists and checks if it is in the note's formation */
    for (fret of openChords) {
        
        let i=1;
        if (fret == currentList[0]) {
            string = fret+")| -"
        } else if (currentList.includes(fret)) {
            string = fret+" | -";
        } else {
            string = "- | -"
        }
        
        let list = [];  /* Makes sure that it doesn't repeat */
        for (note of allLetters) {
            if (list.includes(note)) {break} else {list.push(note)} /* Makes sure that counting doesn't repeat */

            if (fret == note) {
                console.log("this is "+i)
                let count = 0;
                while (count < frets) {
                    var currentLetter = allLetters[i];
                    // Add letter if in chord
                    if (currentList.includes(currentLetter)) {
                        // Check if is a Tonic note and Proper positioning in arm 
                        if (position == 1 && currentLetter == currentList[0] ||  position == 2 && currentLetter == currentList[0] || position == 3 && currentLetter == currentList[0]) {
                            if (currentLetter.length == 2) {
                                string = string +'('+ currentLetter +')'+ " | -";
                            } else {
                                string = string +'('+ currentLetter +')'+ "- | -";
                            }
                        } else if (currentLetter.length == 2) {
                            string = string +' '+ currentLetter + "- | -";
                        } else {
                            string = string +' '+ currentLetter + " - | -";
                        } 
                        
                    } else {string += " - - | -";} 

                    i++;
                    count++; 
                }
            } else { console.log(i); i++; console.log(i)};
        } 
        
        switch (position) {
            case 1:
                string1=string;

            case 2:
                string2=string;
            case 3:
                string3=string;
            case 4:
                string4=string;
            case 5:
                string5=string;
            case 6:
                string6=string;
        }
        position++;
    }

    document.querySelector("#sixth-st").innerHTML = string6;
    document.querySelector("#fifth-st").innerHTML = string5;
    document.querySelector("#fourth-st").innerHTML = string4;
    document.querySelector("#third-st").innerHTML = string3;
    document.querySelector("#second-st").innerHTML = string2;
    document.querySelector("#first-st").innerHTML = string1;


    // ---------------------------------------------------------------------------------------------




}

    
// for (fret of openChords) {

//     // fret example = E 
//     let i=1;
//     let currentNote = "";

//     let list = [];   /* Makes sure that it doesn't repeat */
//     for (note of allLetters) {
//         // note example = C  
//         if (list.includes(note)) {break} else {list.push(note)}   /* Makes sure that it doesn't repeat */
//         if (fret == note) /* if E = e */ {
//             let count = 0;
//             while (count < frets) /* frets = 12 */ {
//                 var currentLetter = allLetters[i]; /* allLetters[5], currentLetter = E*/
//                 // Add letter if in chord
//                 if (currentList.includes(currentLetter)) {
//                     // Check if is a Tonic note and Proper positioning in arm 
//                     if (position == 1 && currentLetter == currentList[0] ||  position == 2 && currentLetter == currentList[0] || position == 3 && currentLetter == currentList[0]) {
//                         /*Here*/
//                         currentNote = "-" + currentLetter + "-";
//                     }   /*Here*/  
//                     else {
//                         currentNote = currentLetter
//                     }
//                 } else {currentNote = "--"} 

//                 count++;
//                 var nameOf = note + String(count);
//                 var data = nameOf.toLowerCase();
//                 // var toInput = current
//                 currentNote = String(currentNote)
//                 console.log(data)
//                 console.log(nameOf)
//                 console.log(currentNote)
//                 document.querySelector(data).innerHTML = currentNote;
//                 // data.innerHTML = document.querySelector("currentNote").innerHTML;
//                 i++;
                    
//             }
//         } else {i++}; /* i = 5*/
//     }
//     /*Here*/ 
//     position++;
// }

/*document.querySelector("#test").innerHTML = string;*/






    // form = document.getElementById('main-form');
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
    // })

    // sessionStorage.setItem('sixth-st', string6);
    // sessionStorage.setItem('fifth-st', string5);
    // sessionStorage.setItem('fourth-st', string4);
    // sessionStorage.setItem('third-st', string3);
    // sessionStorage.setItem('second-st', string2);
    // sessionStorage.setItem('first-st', string1);