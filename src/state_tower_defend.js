/**
 * @fileOverview screeps
 * Created by piers on 17/05/2020
 * @author Piers Shepperson
 */

const gc = require("gc");

function StateTowerDefend (structure) {
    this.type = gc.STATE_TOWER_IDLE;
    this.tower = structure;
}

//todo need to improve.
StateTowerDefend.prototype.enact = function () {
    if (this.tower.room.find(FIND_HOSTILE_CREEPS).length === 0) {
        state.switchTo(this.tower, gc.STATE_TOWER_IDLE)
    }
    if (this.tower.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
        return
    }
    const target = this.tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    this.tower.attack(target);
};

module.exports = StateTowerDefend;