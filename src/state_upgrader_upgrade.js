/**
 * @fileOverview screeps
 * Created by piers on 28/04/2020
 * @author Piers Shepperson
 */
const gf = require("gf");
const gc = require("gc");
const state = require("state");

function State (creep) {
    this.type = gc.STATE_UPGRADER_UPGRADE;
    this.creep = creep
    this.policyId = creep.memory.policyId
    this.homeId = Memory.policies[this.policyId].roomId;
}

State.prototype.enact = function () {
     if (this.creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
        return state.switchTo(this.creep, gc.STATE_UPGRADER_WITHDRAW);
     }

    const home = Game.rooms[this.homeId];
    const result = this.creep.upgradeController(home.controller);
    switch (result) {
        case OK:                        // The operation has been scheduled successfully.
            break;
        case  ERR_NOT_OWNER:            // You are not the owner of this creep, or the room controller is owned or reserved by another player..
            return gf.fatalError("ERR_NOT_OWNER");
        case ERR_BUSY:                  // The creep is still being spawned.
            return gf.fatalError("ERR_BUSY");
        case ERR_NOT_FOUND:     // Extractor not found. You must build an extractor structure to harvest minerals. Learn more.
            return gf.fatalError(ERR_NOT_FOUND);
        case ERR_NOT_ENOUGH_RESOURCES:          // The target does not contain any harvestable energy or mineral..
            console.log("getUsedCapacity",this.creep.store.getUsedCapacity(RESOURCE_ENERGY) )
            console.log("creep",JSON.stringify(this.creep.name))
            return gf.fatalError("ERR_NOT_ENOUGH_RESOURCES" + JSON.stringify(this.creep.store));
        case ERR_INVALID_TARGET:        // 	The target is not a valid source or mineral object
            return gf.fatalError("ERR_INVALID_TARGET");
        case ERR_NOT_IN_RANGE:          // The target is too far away.
            gf.fatalError("ERR_NOT_IN_RANGE");
            return state.switchTo(creep, gc.STATE_HARVESTER_IDLE);

        case ERR_NO_BODYPART:        // There are no WORK body parts in this creep’s body.
            return gf.fatalError("ERR_NO_BODYPART");
        default:
            return gf.fatalError("upgradeController unrecognised return value" + result.toString());
    }
}

module.exports = State;