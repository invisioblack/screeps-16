/**
 * @fileOverview screeps
 * Created by piers on 05/05/2020
 * @author Piers Shepperson
 */
const gc = require("gc");
const policy = require("policy");
const budget = require("budget");
const race = require("race");
const state = require("state");
const flag = require("flag");


function Policy  (id, data) {
    this.id = id;
    this.type = gc.POLICY_HARVESTERS;
    this.parentId = data.parentId;
    this.home = data.home;
    this.m = data.m;
}

Policy.prototype.initilise = function () {
    if (!this.m) {
        this.m = {}
    }
    this.home = Memory.policies[this.parentId].roomName;
    return true;
};

Policy.prototype.enact = function () {
    console.log("POLICY_HARVESTERS enact budget", JSON.stringify(this.budget()));
    const room = Game.rooms[this.home];

    flag.getSpawnQueue(this.home).clearMy(this.parentId);

    const cWorkerLife = race.ticksLeftByPart(this.parentId, gc.RACE_WORKER, CARRY);
    //console.log("ph spawning workers life", cWorkerLife,"CREEP_LIFE_TIME/10",CREEP_LIFE_TIME/10);
    if (cWorkerLife < CREEP_LIFE_TIME/10) {
        policy.sendOrderToQueue(
            room,
            gc.RACE_WORKER,
            room.energyAvailable,
            this.parentId,
            gc.SPAWN_PRIORITY_CRITICAL
        );
        return;
    }

    if (room.energyAvailable < room.energyCapacity) {
        return;
    }

    const wHarvesterLife = race.ticksLeftByPart(this.parentId, gc.RACE_HARVESTER, WORK);
    console.log("ph cWorkerLife",cWorkerLife,"wHarvesterLife",wHarvesterLife);
    const budgetHarvesterWsLt = budget.harvesterWsRoom(room, room, false)*CREEP_LIFE_TIME;
    //const budgetCsLt = budget.portersCsRoom(room, room, false)*CREEP_LIFE_TIME;
    const rationHtoW = budget.workersRoomRationHtoW(room, false);

    //const wHProportionOfBudget = wHarvesterLife/budgetHarvesterWsLt;
    //console.log("ph cWorkerLife",cWorkerLife,"wHarvesterLife",wHarvesterLife,"rationHtoW",rationHtoW,"rationHtoW*wHarvesterLife",rationHtoW*wHarvesterLife)
    if (cWorkerLife < rationHtoW*wHarvesterLife) {
        //console.log("build worker");
            policy.sendOrderToQueue(
                room,
                gc.RACE_WORKER,
                room.energyAvailable,
                this.parentId,
                gc.SPAWN_PRIORITY_LOCAL
            );
    }

    //console.log("ph wHarvesterLife",wHarvesterLife,"budgetHarvesterWsLt",budgetHarvesterWsLt);
    if (wHarvesterLife < budgetHarvesterWsLt) {
        const harvesters = policy.getCreeps(this.parentId, gc.RACE_HARVESTER).length;
        if (harvesters < state.countHarvesterPosts(room)) {
            policy.sendOrderToQueue(
                room,
                gc.RACE_HARVESTER,
                room.energyAvailable,
                this.parentId,
                gc.SPAWN_PRIORITY_LOCAL
            );
        }
    }
};

Policy.prototype.budget = function() {
    return budget.harvesterRoom(Game.rooms[this.home]);
};

Policy.prototype.draftReplacment = function() {
    return this
};

module.exports = Policy;

























