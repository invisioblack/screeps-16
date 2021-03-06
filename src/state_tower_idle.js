/**
 * @fileOverview screeps
 * Created by piers on 17/05/2020
 * @author Piers Shepperson
 */
const gc = require("gc");
const StateBuilding = require("state_building");

class StateTowerIdle extends StateBuilding {
    constructor(structure) {
        super(structure);
        this.tower = structure
    }

    enact() {
        if (this.tower.room.find(FIND_HOSTILE_CREEPS) > 0) {
            state.switchTo(this.tower, gc.STATE_TOWER_DEFEND)
        }
        if (this.tower.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            return
        }

        let damagedStructure = this.tower.room.find(FIND_MY_STRUCTURES, {
            filter: (s) =>  { return this.tower.pos.inRangeTo(s.pos)
                && s.hits < s.hitsMax * gc.TOWER_REPAIR_THRESHOLD
                && s.structureType !== STRUCTURE_WALL
                && s.structureType !== STRUCTURE_RAMPART
            }
        });
        if (damagedStructure.length > 0) {
            this.tower.repair(damagedStructure[0]);
        }
    };
}

module.exports = StateTowerIdle;