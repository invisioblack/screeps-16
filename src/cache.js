/**
 * @fileOverview screeps
 * Created by piers on 30/04/2020
 * @author Piers Shepperson
 */
const gc = require("./gc");
const gf = require("./gf");
//const _ = require("lodash");

const cache = {

    global: function( fn, _this, args, name, force) {
        if (!global[name] || force) {
            global[name] = fn.apply(_this, args);
        }
        return global[name];
    },

    path(from, toArray, range, useRoad, cachePath, now) {
        //console.log("cache path from", from, "name", name);
        if (toArray.length === 0) {
             return undefined;
        }
        if (!range) {
            range = 1
        }
        let goals = _.map(toArray, function(to) {
            return { pos: to.pos, range: range };
        });
        let pfPath;
        if (now) {
            pfPath = PathFinder.search(from.pos, goals, {
                maxCost: gc.MAX_HARVESTER_ROUTE_LENGTH,
                plainCost: 2,
                swampCost: 10,
                roomCallback: this.costMatrixNow,
            })
        } else if (useRoad) {
            pfPath = PathFinder.search(from.pos, goals, {
                maxCost: gc.MAX_HARVESTER_ROUTE_LENGTH,
                roomCallback: this.getCostMatrixRoad,
            })
        } else {
            pfPath = PathFinder.search(from.pos, goals, {
                maxCost: gc.MAX_HARVESTER_ROUTE_LENGTH,
                plainCost: 2,
                swampCost: 10,
                roomCallback: this.getCostMatrix,
            })
        }
        if (cachePath) {
            return {
                path: this.serialisePath(pfPath.path),
                ops: pfPath.ops,
                cost: pfPath.cost,
                incomplete: pfPath.incomplete,
            }
        }
        return {
            path: pfPath.path,
            ops: pfPath.ops,
            cost: pfPath.cost,
            incomplete: pfPath.incomplete,
        }
    },

    costMatrix: {},

    costMatrixRoad: {},

    costMatrixNow: function(roomName) {
        let costs = new PathFinder.CostMatrix;
        Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES).forEach(function (site) {
            if (site.structureType === STRUCTURE_ROAD) {
                costs.set(site.pos.x, site.pos.y, 1);
            } else if (site.structureType !== STRUCTURE_CONTAINER
                && (site.structureType !== STRUCTURE_RAMPART || !site.my)) {
                costs.set(site.pos.x, site.pos.y, 0xff);
            }
        });

        Game.rooms[roomName].find(FIND_CREEPS).forEach(function(creep) {
            costs.set(creep.pos.x, creep.pos.y, 0xff);
        });
        return costs;
    },

    getCostMatrixRoad: function(roomName) {
        if (!this.costMatrixRoad) {
            this.costMatrixRoad = {}
        }
        if(this.costMatrixRoad[roomName]) {
            return this.costMatrixRoad[roomName]
        }
        if (!Game.rooms[roomName]) {
            return;
        }
        let costs = new PathFinder.CostMatrix;
        Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES).forEach(function (site) {
             if (site.structureType !== STRUCTURE_ROAD
                && site.structureType !== STRUCTURE_CONTAINER
                && (site.structureType !== STRUCTURE_RAMPART ||  !site.my)) {
                costs.set(site.pos.x, site.pos.y, 0xff);
            }
        });

        Game.rooms[roomName].find(FIND_STRUCTURES).forEach(function(struct) {
            if (struct.structureType !== STRUCTURE_ROAD
                && struct.structureType !== STRUCTURE_CONTAINER
                && (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) {
                costs.set(struct.pos.x, struct.pos.y, 0xff);
            }
        });

        this.costMatrixRoad[roomName] = costs;
        return costs;
    },

    getCostMatrix: function(roomName) {
        if (!this.costMatrix) {
            this.costMatrix = {}
        }

        if(this.costMatrix[roomName]) {
            return this.costMatrix[roomName]
        }
        if (!Game.rooms[roomName]) {
            return;
        }
        let costs = new PathFinder.CostMatrix;
        Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES).forEach(function (site) {
            if (site.structureType === STRUCTURE_ROAD) {
                costs.set(site.pos.x, site.pos.y, 1);
            } else if (site.structureType !== STRUCTURE_CONTAINER
                    && (site.structureType !== STRUCTURE_RAMPART || !site.my)) {
                costs.set(site.pos.x, site.pos.y, 0xff);
            }
        });

        this.costMatrix[roomName] = costs;
        return costs;
    },

    distance: function(from, toArray, name, range, useRoad, redo, cacheResult) {
        const p = this.path(from, toArray, range, useRoad, redo, cacheResult);
        if (!p) {
            return
        }
        if (!p.incomplete) {
            return p.cost
        }
     },

    distanceSourceSpawn: function(source, spawnRoom, useRoad, redo) {
        const spawns = spawnRoom.find(FIND_MY_SPAWNS);
        return this.distance(source, spawns, "distanceSourceSpawn spawn11", 1, useRoad, redo);
    },

    distanceSourceController: function (source, room, useRoad, redo) {
        return this.distance(source, [room.controller], "distanceSourceController controller", 1, useRoad, redo);
    },

    distanceUpgraderSpawn: function (fromRoom, spawnRoom, useRoad, redo) {
        const spawns = spawnRoom.find(FIND_MY_SPAWNS);
        return this.distance(fromRoom.controller, spawns, "distanceUpgraderSpawn spawns", 1, useRoad, redo);
    },

    sRoomName: function(roomName) {
        if (!roomName) {
            return
        }
        const split = gf.splitRoomName(roomName);
        const ns = String.fromCharCode(split.NS === "N" ? 1 : 0 + split.y);
        const ew = String.fromCharCode(split.EW === "E" ? 1 : 0+ split.x);
        return ns+ew;
    },

    dRoomName: function(str) {
        const nsCode = str.charCodeAt(0);
        const ns = nsCode % 2 === 1 ? "N" : "S" ;
        const y = Math.floor(nsCode / 2);
        const ewCode = str.charCodeAt(1);
        const ew = ewCode % 2=== 1 ? "E" : "W" ;
        const x = Math.floor(ewCode / 2);
        return ew + x.toString() + ns + y.toString();
    },

    sPos: function (pos) {
        if (!pos || !pos.roomName) {
            return
        }
        return this.sPoint(pos) + pos.roomName;
    },

    dPosRn: function (str) {
        if (!str) {
            return
        }
        const code = str.charCodeAt(0);
        return new RoomPosition(code % 50, Math.floor(code / 50), str.substring(1))
    },

    dPos: function (str, roomName) {
        if (!str) {
            return
        }
        const point = this.dPoint(str);
        return new RoomPosition(point.x, point.y, roomName)
    },

    sPoint: function (point) {
        return String.fromCharCode(point.x + 50 * point.y);
    },

    dPoint: function(str) {
        if (!str) {
            return
        }
        const code = str.charCodeAt(0);
        return {"x": code % 50, "y": Math.floor(code / 50)};
    },

    dRoomPos: function(str, roomName) {
        if (!str || roomName) {
            return
        }
        const code = str.charCodeAt(0);
        return new RoomPosition(code % 50, Math.floor(code / 50), roomName)
    },


    serialisePath: function (path) {
        const sPath = [];
        for ( let i in path) {
            sPath.push(path[i].x + 50 * path[i].y);
        }
        return String.fromCharCode(...sPath);
    },

    deserialiseRoArrayN: function(uString, roomName, N) {
        const path = [];
        let n=0;
        for (let i in uString) {
            const code = uString.charCodeAt(i);
            path.push(new RoomPosition(code % 50, Math.floor(code / 50), roomName));
            n++;
            if (n >= N) {
                return path;
            }
        }
        return path;
    },

    deserialisePosAt: function (uString, index, roomName) {
        const code = uString.charCodeAt(index);
        return new RoomPosition(code % 50, Math.floor(code / 50), roomName)
    },

    deserialisePtAt: function (uString, index) {
        const code = uString.charCodeAt(index);
        return { x:code % 50, y:Math.floor(code / 50)}
    },

    deserialiseRoArray: function(uString, roomName) {
        const path = [];
        for (let i in uString) {
            const code = uString.charCodeAt(i);
            path.push(new RoomPosition(code % 50, Math.floor(code / 50), roomName));
        }
        return path;
    },

    deserialisePath: function (uString) {
        const path = [];
        for (let i in uString) {
            const code = uString.charCodeAt(i);
            path.push({"x": code % 50, "y": Math.floor(code / 50)});
        }
        return path;
    },

    deserialiseRoPath: function (uString, startRoom) {
        const path = [];
        let lastX, lastY;
        let rSplit = gf.splitRoomName(startRoom);
        for (let i in uString) {
            const code = uString.charCodeAt(i);
            const x = code % 50;
            const y = Math.floor(code / 50);
            if (lastX !== undefined && lastY !== undefined) {
                if (lastX > x+1) {
                    rSplit.x += rSplit.EW === "W" ? -1 : 1;
                } else if (lastX < x-1) {
                    rSplit.x += rSplit.EW === "W" ? 1 : -1;
                } else if (lastY > y+1) {
                    rSplit.y += rSplit.NS === "N" ? -1 : 1;
                } else if (lastY < y-1) {
                    rSplit.y += rSplit.NS === "N" ? 1 : -1;
                }
                if (rSplit.x < 0) {
                    rSplit.EW = rSplit.EW === "W" ? "E" : "W";
                }
                if (rSplit.y < 0) {
                    rSplit.NS = rSplit.NS === "N" ? "S" : "N";
                }
            }
            path.push(new RoomPosition(x, y, gf.roomNameFromSplit(rSplit)));
            lastX = x;
            lastY = y;
        }
        return path;
    },

    deserialiseRnPath: function (uString, startRoom) {
        const path = [];
        let lastX, lastY;
        let rSplit = gf.splitRoomName(startRoom);
        for (let i in uString) {
            const code = uString.charCodeAt(i);
            const x = code % 50;
            const y = Math.floor(code / 50);
            if (lastX !== undefined && lastY !== undefined) {
                if (lastX > x+1) {
                    rSplit.x += rSplit.EW === "W" ? -1 : 1;
                } else if (lastX < x-1) {
                    rSplit.x += rSplit.EW === "W" ? 1 : -1;
                } else if (lastY > y+1) {
                    rSplit.y += rSplit.NS === "N" ? -1 : 1;
                } else if (lastY < y-1) {
                    rSplit.y += rSplit.NS === "N" ? 1 : -1;
                }
                if (rSplit.x < 0) {
                    rSplit.EW = rSplit.EW === "W" ? "E" : "W";
                }
                if (rSplit.y < 0) {
                    rSplit.NS = rSplit.NS === "N" ? "S" : "N";
                }
            }
            path.push({x:x, y:y, roomName:gf.roomNameFromSplit(rSplit)});
            lastX = x;
            lastY = y;
        }
        return path;
    },

};

if (gc.USE_PROFILER && !gc.UNIT_TEST) {
    const profiler = require("screeps-profiler");
    profiler.registerObject(cache, 'cache');
}
module.exports = cache;







































