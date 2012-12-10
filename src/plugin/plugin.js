//Great ideas taken from: https://github.com/obiot/melonJS/blob/master/src/plugin/plugin.js
(function() {
    gf.plugin = {
        Base: Class.extend({
            gfVersion: undefined,
            init: function() {}
        }),
        //patch a core function
        //For example, to patch the gf.game.update function:
        //
        //gf.plugin.patch(gf.game, 'update', function() {
        //    //display a console message
        //    console.log('doing update!');
        //    //call the original function
        //    this._super();
        //});
        patch: function(obj, name, fn) {
            if(obj.prototype !== undefined) {
                obj = obj.prototype;
            }

            if(typeof prototy[name] == 'function' && typeof fn == 'function') {
                var _super = obj[name];

                obj[name] = (function(name, fn) {
                    return function() {
                        var tmp = this._super;

                        this._super = _super;

                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                       
                        return ret;
                    }
                })(name, fn);
            }
            else {
                console.error(name + ' is not a function in the passed object.');
            }
        },
        //register a plugin
        //For example, to register a new plugin:
        //
        //gf.plugin.register(MyPluginClass, 'myPluginName');
        //
        //var plg = new gf.plugin.myPluginName();
        // //OR
        //gf.plugin.myPluginName.someFunction();
        register: function(plugin, name) {
            //ensure we don't overrite a name
            if(gf.plugin[name]) {
                console.error('plugin ' + name + ' already registered, skipping.');
                return;
            }

            if(plugin.prototype.gfVersion === undefined) {
                throw 'GradeFruitJS: Plugin gfVersion not defined for ' + name;
            } else if(gf.checkVersion(plugin.prototype.gfVersion) > 0) {
                throw 'GradeFruitJS: Plugin gfVersion mismatch, expected: ' + plugin.prototype.gfVersion + ', got: ' + gf.version;
            }

            //store the plugin in the namespace
            gf.plugin[name] = plugin;
        }
    };
})();