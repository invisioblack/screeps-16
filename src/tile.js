/**
 * @fileOverview screeps
 * Created by piers on 26/05/2020
 * @author Piers Shepperson
 */
const C = require("./Constants");

const tile = {

    p: {
        Origin: "origin",
        XDim:  "x_dim",
        YDim: "y_dim",
        Scientist: "scientist",
        LabMap: "lab_map",
        BaseLabs: "base_labs",
        [C.STRUCTURE_TOWER]: C.STRUCTURE_TOWER,
        [C.STRUCTURE_EXTENSION]: C.STRUCTURE_EXTENSION,
        [C.STRUCTURE_LAB]: C.STRUCTURE_LAB,
        [C.STRUCTURE_TERMINAL]: C.STRUCTURE_TERMINAL,
        [C.STRUCTURE_SPAWN]: C.STRUCTURE_SPAWN,
        [C.STRUCTURE_POWER_SPAWN]: C.STRUCTURE_POWER_SPAWN,
        [C.STRUCTURE_ROAD]: C.STRUCTURE_ROAD,
        [C.STRUCTURE_OBSERVER]: C.STRUCTURE_OBSERVER,
        [C.STRUCTURE_LINK]: C.STRUCTURE_LINK,
    },

    towers: {
        TOWER_3x3 : {
            "x_dim": 3,
            "y_dim": 3,
            [C.STRUCTURE_TOWER]: [
                {"x":0,"y":0},{"x":1,"y":0},{"x":2,"y":0},
                {"x":1,"y":1},{"x":0,"y":2},{"x":2,"y":2},
            ]
        },

        TOWER_3x3_2 : {
            "x_dim": 3,
            "y_dim": 3,
            [C.STRUCTURE_TOWER]: [
                {"x":0,"y":0},{"x":0,"y":1},{"x":1,"y":0},
                {"x":1,"y":1},{"x":1,"y":2},{"x":2,"y":1},
            ]
        },
    },

    extensions: {
        EXTENSION_5_3x3 : {
            "x_dim": 3,
            "y_dim": 3,
            extensions: 5,
            [C.STRUCTURE_EXTENSION]: [
                {"x":0,"y":0},{"x":2,"y":0},{"x":0,"y":2},{"x":1,"y":1},{"x":2,"y":2},
            ]
        },

        EXTENSION_10_4x4 : {
            "x_dim": 4,
            "y_dim": 4,
            extensions: 10,
            [C.STRUCTURE_EXTENSION]: [
                {"x":1,"y":0},{"x":2,"y":0},{"x":0,"y":1},{"x":2,"y":1},{"x":3,"y":1},
                {"x":0,"y":2},{"x":1,"y":2},{"x":3,"y":2},{"x":1,"y":3},{"x":2,"y":3},
            ]
        },

        EXTENSION_10_4x4_2 : {
            "x_dim": 4,
            "y_dim": 4,
            extensions: 10,
            [C.STRUCTURE_EXTENSION]: [
                {"x":0,"y":0},{"x":0,"y":1},{"x":0,"y":2},{"x":1,"y":0},{"x":1,"y":1},
                {"x":1,"y":3},{"x":2,"y":0},{"x":2,"y":3},{"x":3,"y":1},{"x":3,"y":2},
            ]
        },
    },


    //tile.Centers.CENTRE_6x6_3
    centres: {
        CENTRE_6x6_1 : {
            "origin" : {"x":0,"y":0},
            "x_dim" : 6,
            "y_dim": 6,
            [C.STRUCTURE_LAB] : [
                {"x":2,"y":3},{"x":2,"y":4},{"x":3,"y":3},
                {"x":2,"y":5},{"x":1,"y":3},{"x":1,"y":2},
                {"x":2,"y":2},{"x":1,"y":3},{"x":2,"y":4},{"x":1,"y":4}
            ],
            ["base_labs"] : 4,
            [C.STRUCTURE_STORAGE] : [{"x":4,"y":4}],
            [C.STRUCTURE_TERMINAL] : [{"x":4,"y":5}],
            [C.STRUCTURE_LINK] : [{"x":3,"y":5}],
            [C.STRUCTURE_SPAWN] : [{"x":0,"y":0},{"x":3,"y":0},{"x":4,"y":0}],
            [C.STRUCTURE_POWER_SPAWN] : [{"x":1,"y":0}],
            "scientist" : [{"x":3,"y":4}],
            [C.STRUCTURE_ROAD] : [
                {"x":0,"y":5},{"x":0,"y":4},{"x":0,"y":3},{"x":0,"y":2},{"x":0,"y":1},{"x":0,"y":0},
                {"x":1,"y":1},{"x":2,"y":1},{"x":3,"y":1},{"x":4,"y":1},{"x":5,"y":1},
                {"x":5,"y":0},{"x":5,"y":2},{"x":5,"y":3},{"x":5,"y":4},{"x":5,"y":5},
                {"x":4,"y":3}, {"x":3,"y":4}
            ],
            [C.STRUCTURE_OBSERVER]:  [{"x":1,"y":5}]
        },

        CENTRE_6x6_2 : {
            "origin" : {"x":0,"y":0},
            "x_dim" : 6,
            "y_dim": 6,
            [C.STRUCTURE_LAB] : [
                {"x":2,"y":2},{"x":2,"y":3},{"x":3,"y":2},
                {"x":2,"y":4},{"x":3,"y":1},{"x":4,"y":1},
                {"x":1,"y":3},{"x":1,"y":4},{"x":5,"y":2},{"x":5,"y":3}
            ],
            ["base_labs"] : 4,
            [C.STRUCTURE_STORAGE] : [{"x":4,"y":4}],
            [C.STRUCTURE_TERMINAL] : [{"x":3,"y":4}],
            [C.STRUCTURE_LINK] : [{"x":4,"y":3}],
            [C.STRUCTURE_SPAWN] : [{"x":0,"y":0},{"x":1,"y":1},{"x":5,"y":0}],
            [C.STRUCTURE_POWER_SPAWN] : [{"x":0,"y":2}],
            "scientist" : [{"x":3,"y":3},{"x":4,"y":2}],
            [C.STRUCTURE_OBSERVER]:  [{"x":0,"y":5}]
        },

        CENTRE_6x6_3 : {
            "origin" : {"x":0,"y":0},
            "x_dim" : 6,
            "y_dim": 6,
            [C.STRUCTURE_LAB] : [
                {"x":2,"y":2},{"x":2,"y":3},{"x":3,"y":2},
                {"x":1,"y":3},{"x":2,"y":4},{"x":1,"y":4},
                {"x":3,"y":1},{"x":2,"y":1},{"x":1,"y":1},{"x":4,"y":1}
            ],
            ["lab_map"] : [
                [1,2,3,4,5,6,7,8,9],[0,2,3,4,5,6,7,8,9],[0,1,3,4,5,6,7,8,9],
                [0,1,2,4,5,6,7,8],[0,1,2,3,5],[0,1,2,3,4],
                [0,1,2,3,7,8,9],[0,1,2,3,6,8,9],[0,1,2,3,6,7],[0,1,2,6,7]
            ],
            ["base_labs"] : 4,
            [C.STRUCTURE_STORAGE] : [{"x":4,"y":4}],
            [C.STRUCTURE_TERMINAL] : [{"x":3,"y":4}],
            [C.STRUCTURE_LINK] : [{"x":4,"y":3}],
            [C.STRUCTURE_SPAWN] : [{"x":0,"y":0},{"x":0,"y":2},{"x":5,"y":0}],
            [C.STRUCTURE_POWER_SPAWN] : [{"x":5,"y":2}],
            "scientist" : [{"x":3,"y":3}],
            [C.STRUCTURE_OBSERVER]:  [{"x":0,"y":5}]
        },
    },


    getCopy : function (tileObj) {
        if (!tileObj) {
            return;
        }
        return JSON.parse(JSON.stringify(tileObj));
    },

    shiftToOrigin: function(tile) {
        if (!("origin" in tile)) {
            return;
        }
        for (let key in tile) {
             if (Array.isArray(tile[key])) {
                for ( let pt of tile[key]) {
                    pt.x += tile["origin"].x;
                    pt.y += tile["origin"].y;
                }
            }
        }
    },

};

module.exports = tile;
