/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

//type Site = { id: number; x: number; y: number; radius: number };

const numSites: number = parseInt(readline());
let sites: { id: number, x: number, y: number, radius: number }[] = [];
for (let i = 0; i < numSites; i++) {
    var inputs: string[] = readline().split(' ');
    const siteId: number = parseInt(inputs[0]);
    const x: number = parseInt(inputs[1]);
    const y: number = parseInt(inputs[2]);
    const radius: number = parseInt(inputs[3]);
    sites.push({ id: siteId, x, y, radius});
}
let myBarracks: number[] = [];
let myTowers:number[] = [];
let damagedTowers:number[] = [];


let campAngle = 0;
//fonction pour camper
function campAroundTower(towerId:number) {
    const t = sites.find(s => s.id === towerId)!;
    campAngle += 0.25 + Math.random() * 0.3; // vitesse variable
    const dist = 60 + Math.random() * 40;  // distance variable
    const x = Math.round(t.x + Math.cos(campAngle) * dist);
    const y = Math.round(t.y + Math.sin(campAngle) * dist);
    return { x, y };
}


// game loop
while (true) {

    let freeSites: number[] = [];
    let enemyQueenX = 0, enemyQueenY = 0;
    let queenX = 0, queenY = 0;

    var inputs: string[] = readline().split(' ');
    const gold: number = parseInt(inputs[0]);
    const touchedSite: number = parseInt(inputs[1]); // -1 if none

    for (let i = 0; i < numSites; i++) {
        var inputs: string[] = readline().split(' ');
        const siteId: number = parseInt(inputs[0]);
        const ignore1: number = parseInt(inputs[1]); // used in future leagues
        const ignore2: number = parseInt(inputs[2]); // used in future leagues
        const structureType: number = parseInt(inputs[3]); // -1 = No structure,1 = Tower, 2 = Barracks
        const owner: number = parseInt(inputs[4]); // -1 = No structure, 0 = Friendly, 1 = Enemy
        const param1: number = parseInt(inputs[5]);
        const param2: number = parseInt(inputs[6]);

        if (structureType === -1) freeSites.push(siteId);
        if (structureType === 2 && owner === 0 && !myBarracks.includes(siteId)) myBarracks.push(siteId);
        if (structureType === 1 && owner === 0) {
            if (!myTowers.includes(siteId)) myTowers.push(siteId);
            if (param1 < 400) damagedTowers.push(siteId); // seuil réparation
        }

    }
    
    const numUnits: number = parseInt(readline());
    for (let i = 0; i < numUnits; i++) {
        var inputs: string[] = readline().split(' ');
        const x: number = parseInt(inputs[0]);
        const y: number = parseInt(inputs[1]);
        const owner: number = parseInt(inputs[2]);
        const unitType: number = parseInt(inputs[3]); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
        const health: number = parseInt(inputs[4]);

        if (unitType === -1 && owner === 0) { queenX = x; queenY = y; }
        if (unitType === -1 && owner === 1) { enemyQueenX = x; enemyQueenY = y; }
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    // First line: A valid queen action
    // ACTION REINE
    if (damagedTowers.includes(touchedSite)) {
        console.log(`BUILD ${touchedSite} TOWER`);
    }
    else if (myBarracks.length < 2 && freeSites.includes(touchedSite)) {
        console.log(`BUILD ${touchedSite} BARRACKS-KNIGHT`);
        myBarracks.push(touchedSite);
    }
    else if (myBarracks.length < 2 && freeSites.length>0) {
        const s = freeSites.map(id=>sites.find(x=>x.id===id)!)
            .sort((a,b)=>Math.hypot(a.x-queenX,a.y-queenY)-Math.hypot(b.x-queenX,b.y-queenY))[0];
        console.log(`MOVE ${s.x} ${s.y}`);
    }
    else if (myTowers.length < 4 && freeSites.includes(touchedSite)) {
        console.log(`BUILD ${touchedSite} TOWER`);
        myTowers.push(touchedSite);
    }
    else if (myTowers.length < 4 && freeSites.length>0) {
        const s = freeSites.map(id=>sites.find(x=>x.id===id)!)
            .sort((a,b)=>Math.hypot(a.x-queenX,a.y-queenY)-Math.hypot(b.x-queenX,b.y-queenY))[0];
        console.log(`MOVE ${s.x} ${s.y}`);
    }
    else if (myTowers.length>0) {
        const p = campAroundTower(myTowers[0]);
        console.log(`MOVE ${p.x} ${p.y}`);
    }
    else {
        console.log(`MOVE ${queenX} ${queenY}`);
    }
    // Second line: A set of training instructions
    let trainCmd = "TRAIN";
    let g = gold;

    for (let id of myBarracks) {
        if (g >= 80) {
            trainCmd += " " + id;
            g -= 80;
        }
    }
    console.log(trainCmd);

}