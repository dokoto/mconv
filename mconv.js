'use strict';

const fs = require('fs');
const path = require('path');

class Mconv {
    constructor(options) {
        this.converter = null;
    }

    _help() {
        console.log('Use: mconv [type] [modificators]');
        let folders = fs.readdirSync('./modules');
        console.log('Type of media conversions:');
        for (let i = 0; i < folders.length; i++) {
            console.log('----------------------------------------------------------');
            console.log(folders[i]);
            console.log('Use: mconv %s -help', folders[i]);
            console.log('----------------------------------------------------------');
        }
    }

    _execModule(module) {
        try {
            const Converter = require(path.join(__dirname + '/modules', process.argv[2], 'converter.js'));
            this.converter = new Converter();
            this.converter[module]();
            return false;
        } catch (error) {
            console.error('[MCONV] Module %s not found', process.argv[2]);
            console.error('[MCONV] ' + error);
            return false;
        }
    }

    _validation() {
        if (process.argv.length === 2) {
            this._help();
            return false;
        } else if (process.argv.length === 4 && process.argv.indexOf('-help') !== -1) {
            this._execModule('_help');
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
