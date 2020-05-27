/**
 * @fileOverview screeps
 * Created by piers on 25/04/2020
 * @author Piers Shepperson
 */

const race_worker = {
    WORKER_MAX_SIZE: 16,
    BLOCKSIZE: 100 + 50 + 50,

    bodyCounts: function (ec) {
        const parts =  Math.floor(ec/this.BLOCKSIZE);
        let  size = Math.min(parts, this.WORKER_MAX_SIZE);
        size = Math.min(16, size);
        return {"work": size, "carry": size, "move" : size};
    },

    boosts: [
        { priority : 3, resource: RESOURCE_KEANIUM_HYDRIDE, part : CARRY },
        { priority : 1, resource: RESOURCE_LEMERGIUM_HYDRIDE, part : WORK },
        { priority : 2, resource: RESOURCE_ZYNTHIUM_OXIDE, part : MOVE },

        { priority : 3, resource : RESOURCE_KEANIUM_ACID, part : CARRY },
        { priority : 1, resource : RESOURCE_LEMERGIUM_ACID, part : WORK },
        { priority : 2, resource : RESOURCE_ZYNTHIUM_ALKALIDE, part : MOVE },

        { priority : 3, resource : RESOURCE_CATALYZED_KEANIUM_ACID, part : CARRY },
        { priority : 1, resource : RESOURCE_CATALYZED_LEMERGIUM_ACID, part : WORK },
        { priority : 2, resource : RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, part : MOVE },
    ]

};

module.exports = race_worker;