// CREATE GUITAR LISTS
let allSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    // let allSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm'];
let allBemol = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// SCALES
let major = [0, 2, 4, 5, 7, 9, 11, 12];
let minor = [0, 2, 3, 5, 7, 8, 10, 12];

let letter;
let mainList = allSharp;
let finList = [];
let listType;

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
    // Correct if mainList does not contain Chord
    if (pos == -1) {
        if (mainList == allSharp) {
            mainList = allBemol;
        } else {mainList = allSharp;}
        pos = mainList.indexOf(letter);
    }


    // Add scale notes to list and to page
    mkScale(listType, mainList, pos);

    // Set to use bemol or sharp scale
    bemolOrSharp();

    mkScale(listType, mainList, pos);

    document.querySelector('#scale1').innerHTML = finList;

    // Create progression from scale    
    progression(finList);
    
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
}

function bemolOrSharp() {
    for (let i = 0; i < finList.length; i++) {

        curr = finList[i];
        if (finList[i+1] != undefined) {
            following = finList[i+1];
            if (curr[0] == following[0]) {
                if (mainList == allSharp) {
                    mainList = allBemol;
                } else {mainList = allSharp;}
                break
            }
        } else {break;}
    }
        
}



function progression(finList) {
    // Progression 1
    let pro1List = [];
    let pro1 = [0, 4, 5, 3];
    for (let i = 0; i < 4; i++) {
        position = pro1[i];
        find = finList[position];
        if (position == 5) {
            find = find+"m";
        }
        pro1List.push(find);
    }
    document.querySelector('#pro1').innerHTML = pro1List;

    // Progression 2
    let pro2List = [];
    let pro2 = [0, 3, 5, 4];
    for (let i = 0; i < 4; i++) {
        position = pro2[i];
        find = finList[position];
        if (position == 5) {
            find = find+"m";
        }
        pro2List.push(find);
    }
    document.querySelector('#pro2').innerHTML = pro2List;

    // Progression 3
    let pro3List = [];
    let pro3 = [0, 5, 3, 4];
    for (let i = 0; i < 4; i++) {
        position = pro3[i];
        find = finList[position];
        if (position == 5) {
            find = find+"m";
        }
        pro3List.push(find);
    }
    document.querySelector('#pro3').innerHTML = pro3List;
}