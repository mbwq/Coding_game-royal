/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

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
// game loop
while (true) {
    var inputs: string[] = readline().split(' ');
    const gold: number = parseInt(inputs[0]);
    const touchedSite: number = parseInt(inputs[1]); // -1 if none

    let queenX = 0, queenY = 0;
    const SAFE_X = 30;
    const SAFE_Y = 30;

    for (let i = 0; i < numSites; i++) {
        var inputs: string[] = readline().split(' ');
        const siteId: number = parseInt(inputs[0]);
        const ignore1: number = parseInt(inputs[1]); // used in future leagues
        const ignore2: number = parseInt(inputs[2]); // used in future leagues
        const structureType: number = parseInt(inputs[3]); // -1 = No structure, 2 = Barracks
        const owner: number = parseInt(inputs[4]); // -1 = No structure, 0 = Friendly, 1 = Enemy
        const param1: number = parseInt(inputs[5]);
        const param2: number = parseInt(inputs[6]);

        if (structureType === 2 && owner === 0 && !myBarracks.includes(siteId)) {
            myBarracks.push(siteId);
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

        if (unitType === -1 && owner === 0) {
            queenX = x;
            queenY = y;
        }
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    if (myBarracks.length < 2 && touchedSite != -1) {
        console.log(`BUILD ${touchedSite} BARRACKS-KNIGHT`);
    }
    else if (myBarracks.length < 2) {
        let target = sites.find(s => !myBarracks.includes(s.id));
        if (target) console.log(`MOVE ${target.x} ${target.y}`);
        else console.log("WAIT");
    }
    else {
        console.log(`MOVE ${SAFE_X} ${SAFE_Y}`);
    }

    // First line: A valid queen action
    // Second line: A set of training instructions
    let trainCmd = ("TRAIN");
    for (let id of myBarracks) trainCmd += " " + id;
    console.log(trainCmd);
}