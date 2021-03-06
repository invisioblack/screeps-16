/**
 * @fileOverview screeps
 * Created by piers on 01/06/2020
 * @author Piers Shepperson
 */
const gc = require("../src/gc");
gc.UNIT_TEST = true;
const assert = require('assert');
//const C = require("../src/Constants");
//const FlagRoom = require("../src/flag_room");
const MockFlagRoom = require("./mocks/flag_room");

describe("flag_room", function() {
    describe("value", function() {

        it("should value a room", function() {
            const flagRooms = MockFlagRoom.createMock0123();
            //console.log("flagRooms[0]", JSON.stringify(flagRooms[0],"","\t"))
            for (let i = 0 ; i < flagRooms.length ; i++) {
                const value1 = flagRooms[i].value("spawnRoom");
                const value2 = flagRooms[i].value("spawnRoom", false, false, 5000);
                //console.log(i, "no roads",JSON.stringify(value1,"no roads","\t"), );
                console.log(i, "value1 no roads",value1.netEnergy, value1.profitParts, "no roads 24h",value2.netEnergy, value2.profitParts);
                //console.log(i, "no roads",JSON.stringify(value1,"no roads","\t"), );
                console.log(i, "value2 no roads 24h",value2.netEnergy, value2.profitParts);
                //console.log(i, "no roads",JSON.stringify(value2,"","\t"), );
                if ( i === 0 ) {
                    assert(value1.profitParts <= 0);
                    continue
                }
                //assert(value1.profitParts > 298 && 330 > value1.profitParts);
                //assert(value2.profitParts >16 && 140 > value2.profitParts);

                const value3 = flagRooms[i].value("spawnRoom", true, false);
                console.log(i, "value3 roads",value3.netEnergy, value3.profitParts);
                //console.log(i, "roads",JSON.stringify(value3, "","\t"));
                //assert(value3.profitParts > 330 && 380 > value3.profitParts);
                const value3a = flagRooms[i].value("spawnRoom", true, false,5000);
                console.log(i, "value3a roads 24h",value3a.netEnergy, value3a.profitParts);
                //console.log(i, "roads",JSON.stringify(value3, "","\t"));
                //console.log(i, "roads",JSON.stringify(value3a, "","\t"));
                //assert(value3a.profitParts > 21 && 150 > value3a.profitParts);


                if (i < 3) {
                    const value4 = flagRooms[i].value("spawnRoom", false, true);
                    const value4a = flagRooms[i].value("spawnRoom", false, true, 5000);
                    const value5 = flagRooms[i].value("spawnRoom", true, true);
                    const value5a = flagRooms[i].value("spawnRoom", true, true, 5000);

                    //console.log(i, "no roads reserved",JSON.stringify(value4, "","\t"));
                    //console.log(i, "no roads reserved",value4.netEnergy, value4.profitParts, "no roads reserved 24h",value4a.netEnergy, value4a.profitParts);
                    //console.log(i, "roads reserved",JSON.stringify(value5, "","\t"));
                    //console.log(i, "roads reserved",value5.netEnergy, value5.profitParts, "roads reserved 24h",value5a.netEnergy, value5a.profitParts);
                }
            }
        });

    });
});