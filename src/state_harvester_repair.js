/**
 * @fileOverview screeps
 * Created by piers on 28/04/2020
 * @author Piers Shepperson
 */

const gc = require("gc");
const gf = require("gf");
const state = require("state");
const RoomFlag = require("flag_room");
const StateCreep = require("./state_creep");

class StateHarvesterRepair extends StateCreep {
    constructor(creep) {
        super(creep);
    }

    enact() {
        if (state.spaceForHarvest(this.creep)) {
            return this.switchTo( gc.STATE_HARVESTER_HARVEST)
        }
        const fRoom = new RoomFlag(this.targetPos.roomName);
        const scPos = gf.roomPosFromPos(fRoom.getSourceContainerPos(this.targetId));
        const container = state.findContainerAt(scPos);
        if (!container) {
            return this.switchTo( gc.STATE_HARVESTER_BUILD)
        }

        if (container.hits === container.hitsMax) {
            return this.switchTo( gc.STATE_HARVESTER_TRANSFER)
        }

        const result = this.creep.repair(container);
        switch (result) {
            case OK:                        // The operation has been scheduled successfully.
                break;
            case  ERR_NOT_OWNER:            // You are not the owner of this creep, or the room controller is owned or reserved by another player..
                return gf.fatalError("ERR_NOT_OWNER");
            case ERR_BUSY:                  // The creep is still being spawned.
                return gf.fatalError("ERR_BUSY");
            case ERR_NOT_ENOUGH_RESOURCES:          // The target does not contain any harvestable energy or mineral..
                return gf.fatalError("ERR_NOT_ENOUGH_RESOURCES");
            case ERR_INVALID_TARGET:        // 	The target is not a valid source or mineral object
                return gf.fatalError("ERR_INVALID_TARGET");
            case ERR_NOT_IN_RANGE:          // The target is too far away.
                return gf.fatalError("ERR_NOT_IN_RANGE");
            case ERR_NO_BODYPART:        // There are no WORK body parts in this creep’s body.
                console.log(this.creep.name,"in combat body", this.creep.body);
                return ERR_NO_BODYPART;
            //return gf.fatalError("ERR_NO_BODYPART");
            default:
                return gf.fatalError("no valid result");
        }
    };

}

module.exports = StateHarvesterRepair;