class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config) {
            this.config = config;
            this.state = this.config.initial;
            this.prevStates = [];
            this.prevStates.push(this.state);
            this.transitions = 0;
        } else {
            throw Error('Config isn\'t passed');
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
            throw new Error('State isn\'t exist');
        } else {
            this.state = state;    
            this.transitions++;
            this.prevStates[this.transitions] = this.state;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var currentEvent = this.config.states[this.state].transitions[event];
        
        if (!currentEvent) {
            throw new Error ('Event in current state isn\'t exist');
        } else {
            this.state = currentEvent;
            this.transitions++;
            this.prevStates[this.transitions] = this.state;
        }
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
        var arrStates = [];
        var states = this.config['states'];

        if (!event) { 
            for (var key in states) {
                arrStates.push(key);
            }
        } else {
            for (var key in states) {
                if (states[key].transitions[event]) {
                    arrStates.push(key);
                }
            }
        }

        return arrStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.transitions) {
            this.transitions--;
            this.state = this.prevStates[this.transitions];
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.transitions == this.prevStates.length - 1) {
            return false;
        } else {
            this.transitions++;
            this.state = this.prevStates[this.transitions];
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = this.config.initial;
        this.prevStates = [];
        this.prevStates.push(this.state);
        this.transitions = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/


