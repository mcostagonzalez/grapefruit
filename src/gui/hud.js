(function() {
    gf.HUD = {
        //has the HUD been initialized
        initialized: false,

        init: function(settings) {
            if(this.initialized) return;

            //is the HUD visible?
            this.visible = true;

            //use the passed settings object ot override the default values above
            gf.utils.setValues(this, settings);

            //create the base div of this element
            this._createElement();

            this.initialized = true;

            //some private stuffs
            this.dirty = true;

            //the items in this HUD
            this.items = {};
            this.numItems = 0;
        },
        addItem: function(name, item) {
            //increment if a new item
            if(!this.items[name]) this.numItems++;

            item.name = name;
            this.items[name] = item;
            this.dirty = true;
            this.$elm.append(item.$elm);
            return this;
        },
        removeItem: function(name) {
            if(this.items[name]) {
                this.items[name].$elm.remove();
                this.items[name] = null;
                this.numItems--;
                this.dirty = true;
            }

            return this;
        },
        setItemValue: function(name, value) {
            if(this.items[name]) {
                this.items[name].setValue;
                this.dirty = true;
            }

            return this;
        },
        getItemValue: function(name) {
            return (this.items[name] ? this.items[name].getValue() : null);
        },
        reset: function(name) {
            if(name !== undefined) {
                if(this.items[name]) this.items[name].reset();
                this.dirty = true;
            } else {
                this.resetAll();
            }

            return this;
        },
        resetAll: function() {
            gf.utils.each(this.items, function(name, item) {
                item.reset();
            });

            return this;
        },
        update: function() {
            if(!this.dirty) return;

            gf.utils.each(this.items, function(name, item) {
                if(item.visible) {
                    item.update();
                }
            });

            this.dirty = false;
        },
        _createElement: function() {
            this.$elm = $('<div/>', {
                'class': 'gf-hud'
            }).css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                /*top: gf.game._$cont.position().top,
                left: gf.game._$cont.position().left,*/
                zIndex: 6
            }).appendTo(gf.game._$cont);
        }
    };
})();