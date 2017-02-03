class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config) {
            this.config = config;
            this.state = config.initial;
            this.prevStates = [];
            this.prevStates.unshift(config.initial);
            this.transitions = 0;
        } else {
            throw Error('Error');
        }
    } 
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config.states[state]) {
            throw new Error('Error');
        }
        this.state = state;    
        this.prevStates.unshift(this.state);
        this.transitions = 0;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var currentEvent = this.config.states[this.state].transitions[event];
        if (!currentEvent) {
            throw new Error ('error');
        }
        this.state = currentEvent;
        this.prevStates.unshift(this.state);
        this.transitions = 0;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        debugger;
        var arr = [];
        var obj = this.config['states'];

        if (!event) {
            for (var key in obj) {
                arr.push(key);
            }
        } else {
            for (var key in obj) {
                if (obj[key].transitions[event]) {
                    arr.push(key);
                }
            }
        }

        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevStates.length <= 1 || this.transitions >= this.prevStates.length - 1) {
            return false;
        } else {
        this.transitions++;
        this.state = this.prevStates[this.transitions];
        return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.prevStates.length <= 1 ||  this.transitions == 0 ) {
            return false;
        } else {
        this.transitions--;
        this.state = this.prevStates[this.transitions];
        return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevStates = [];
        this.transitions = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

// const config = {
//     initial: 'normal',
//     states: {
//         normal: {
//             transitions: {
//                 study: 'busy',
//             }
//         },
//         busy: {
//             transitions: {
//                 get_tired: 'sleeping',
//                 get_hungry: 'hungry',
//             }
//         },
//         hungry: {
//             transitions: {
//                 eat: 'normal'
//             },
//         },
//         sleeping: {
//             transitions: {
//                 get_hungry: 'hungry',
//                 get_up: 'normal',
//             },
//         },
//     }
// };
