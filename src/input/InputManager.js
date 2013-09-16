var utils = require('../utils/utils'),
    Keyboard = require('./Keyboard'),
    Gamepad = require('./Gamepad');

/**
 * Manages all input handlers in a unified way
 *
 * @class InputManager
 * @extends Object
 * @namespace gf
 * @constructor
 * @param view {DOMElement} The DOMElement to bind input events to
 */
var InputManager = module.exports = function(view) {
    /**
     * The dom element to bind events to
     *
     * @property view
     * @type Game
     */
    this.view = view;

    /**
     * Holds the keyboard handler for keyboard events
     *
     * @property keyboard
     * @type Keyboard
     * @readOnly
     */
    this.keyboard = new Keyboard(view);

    /**
     * Holds the gamepad handler for gamepad events
     *
     * @property gamepad
     * @type Keyboard
     * @readOnly
     */
    this.gamepad = new Gamepad();
};

utils.inherits(InputManager, Object, {
    /**
     * Called each frame to update state info for some input methods
     *
     * @method update
     * @private
     */
    update: function(dt) {
        this.gamepad.update(dt);
    }
});