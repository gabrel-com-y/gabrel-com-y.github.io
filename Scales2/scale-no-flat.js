// CREATE GUITAR LISTS
let allSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// SCALES
let major = [0, 2, 4, 5, 7, 9, 11, 12];
let minor = [0, 2, 3, 5, 7, 8, 10, 12];

let letter;
let mainList = allSharp;
let finList = [];
let listType;
let listOrder;

function choose() {
    //Start list from nothing
    finList = [];
    // Get chosen letter 
    letter = document.getElementById("chord").value;

    // Choose either Major or Minor scale
    scTy = document.getElementById("type").value;
    
    if (scTy == 'Ma') {
        listType = major;
    } else if (scTy = 'Mi') {
        listType = minor;
    }

    // Find chord's position (pos)
    let pos = mainList.indexOf(letter);   

    // Add scale notes to list and to page
    mkScale(listType, mainList, pos);

    // Set to use bemol or sharp scale
    bemolOrSharp();

    // mkScale(listType, mainList, pos);

    scaleInTable(finList);
}

function mkScale(listType, mainList, pos) {
    finList = [];
    for (numb in listType) {
        numInPlace = listType[numb]+pos;
        if (numInPlace > 11) {
            numInPlace = numInPlace - 12;
        }
        finList.push(mainList[numInPlace]);
    }
    for ( i=0; i < finList.length; i++) {
        if (i == 1 || i == 2 || i == 5) {
            console.log(i);
            finList[i] = finList[i]+'m'; 
        }
    }
    console.log(finList);
}

function bemolOrSharp() {
    for (let i = 0; i < finList.length; i++) {

        curr = finList[i];
        if (finList[i+1] != undefined) {
            following = finList[i+1];
        } else {break;}
    }
        
}

// Create progression from scale    
function progression(finList) {
    
    let first = document.getElementById("note1").value;
    let second = document.getElementById("note2").value;
    let third = document.getElementById("note3").value; 
    let fourth = document.getElementById("note4").value;
    let chordList = [first, second, third, fourth];
    console.log(chordList);
    
    let proList = [];
    for ( i = 0; i < chordList.length; i++) {
		let x = chordList[i];
		proList.push(finList[x]);
    }
	document.querySelector("#progression").innerHTML = proList;

}

function scaleInTable(finList) {
    document.querySelector("#r1").innerHTML = finList[0];
    document.querySelector("#r2").innerHTML = finList[1];
    document.querySelector("#r3").innerHTML = finList[2];
    document.querySelector("#r4").innerHTML = finList[3];
    document.querySelector("#r5").innerHTML = finList[4];
    document.querySelector("#r6").innerHTML = finList[5];
    document.querySelector("#r7").innerHTML = finList[6];
}
