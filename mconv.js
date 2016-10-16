'use strict';

const fs = require('fs');
const path = require('path');
const modprefix = 'mconv_mod';

class Mconv {
    constructor(options) {
        this.converter = null;
        this.mods = [];
    }

    _help() {
        console.log('Use: mconv [type] [modificators]');
        console.log('Sample: mconv flac2mp3 -help');
        let dependencies = require(path.join(__dirname, 'package.json')).dependencies;

        for (let dep in dependencies) {
            if (dep.indexOf(modprefix) !== -1) {
                this.mods.push(dep.substr(modprefix.length + 1));
            }
        }

        if (this.mods.length > 0) {
            console.log('Type of media conversions:');
            for (let i = 0; i < this.mods.length; i++) {
                console.log('-%s', this.mods[i]);
            }
        }

        return false;
    }

    _execModule(module) {
        try {
            //const Converter = require(path.join(__dirname + '/node_modules/mconv_mod_' + process.argv[2], 'mconv_mod_' + process.argv[2]));
            const Converter = require(modprefix + '_' + process.argv[2]);
            //const Converter = require('mconv_mod_flac2mp3');
            this.converter = new Converter();
            this.converter[module]();
        } catch (error) {
            console.error('[MCONV] Module %s not found', process.argv[2]);
            console.error('[MCONV] ' + error);
        }
        return false;
    }

    _validation() {
        //console.log(process.argv);
        if (process.argv.length === 2) {
            return this._help();
        } else if (process.argv.length === 5 && process.argv.indexOf('-help') !== -1) {
            return this._execModule('_help');
        }

        return true;
    }

    start() {
        if (this._validation()) {
            this._execModule('start');
        }
    }
}

new Mconv().start();
