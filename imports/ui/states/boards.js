//

const boardsStore = {

    subscriptions: {},

    set(boardId, options, value) {
        if(!this[boardId]) this[boardId] = {};
        this[boardId] = {
            [options]: value 
        }
    },
    get(boardId, options) {
        return this[boardId][options];
    },
    setTopMenu(boardId, value) {
        if(!this[boardId]) this[boardId] = {};
        this[boardId] = {
            topMenu: value 
        }
    },
    getTopMenu(boardId) {
        return this[boardId].topMenu;
    },
    //--------------------------

    setSubscription (obj ) {
        const {dataId: id} = obj;
        if(!this.subscriptions[id]){
            this.subscriptions[id] = {...obj};
        } else {
            this.subscriptions[id] = {...this.subscriptions[id], ...obj}
        }
    },
    pushData (id, data) {
        this.subscriptions[id].callback(data)
    },
    cleanSubscription (id) {
        this.subscriptions[id] = null
    },

    getSubscription (id) {
        return this.subscriptions[id]
    }



};

export default boardsStore;