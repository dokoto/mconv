'use strict';

const glob = require('glob');
const path = require('path');
const _ = require('underscore');
const sh = require('shelljs');

class Converter {
    constructor(options) {
        this.args = {};
        this.ffmpeg = 'ffmpeg -i "<%= filePath %>" -f mp3 -ab 192000 "<%= folderPath %><%= fileName %>.<%= fileExtTo %>" 2> /dev/null';
        this.delete = 'rm -rf "<%= folderPath %><%= fileName %>.<%= fileExtFrom %>"';
    }

    start() {
        if (this._validation()) {
            glob(path.join(this.args.folderPath, '/**/*.flac'), this._processFiles.bind(this));
        }
    }

    _validation() {
        if (process.argv.length <= 2) {
            console.log('Use: flac2mp3 [folder path] [modificators]');
            console.log('-delete: Delete flac files before it\'ve been converted');
            console.log('-test: No convert and not delete only testing');
            console.log('-verbose: Full logs');
            console.log('$> flac2mp3 /Users/paco/flacFilesForlder');
            return false;
        }

        this.args.folderPath = process.argv[2];
        if (process.argv.indexOf('-delete') !== -1) {
            this.args.deleteFlac = true;
        }

        if (process.argv.indexOf('-test') !== -1) {
            this.args.test = true;
        }

        if (process.argv.indexOf('-verbose') !== -1) {
            this.args.verbose = true;
        }

        return true;
    }

    _execCommad(cmd) {
        if (!this.args.test) {
            sh.exec(cmd, {
                silent: true,
                async: false
            });
        }
    }

    _processFile(file, cmdFFMPEG, cmdDELETE) {
        let args = {
            filePath: file,
            folderPath: file.substr(0, file.lastIndexOf(path.sep) + 1),
            fileName: file.substr(file.lastIndexOf(path.sep) + 1),
            fileExtFrom: 'flac',
            fileExtTo: 'mp3'
        };
        args.fileName = args.fileName.substr(0, args.fileName.lastIndexOf('.'));
        console.log('[FLAC CONVERTER] Converting "%s"', args.fileName);
        this._execCommad(cmdFFMPEG(args));
        if (this.args.deleteFlac) {
            if (this.delete.indexOf('*') !== -1) {
                console.error('[FLAC CONVERTER] * are forbiden');
            } else {
                //console.log('[FLAC CONVERTER] Deleting "%s"', args.fileName);
                this._execCommad(cmdDELETE(args));
            }
        }
    }

    _processFiles(error, files) {
        console.log('[FLAC CONVERTER] %d flac files to be converted', files.length);

        let filePath, fileName, cmdFFMPEG, cmdDELETE;
        cmdFFMPEG = _.template(this.ffmpeg);
        cmdDELETE = _.template(this.delete);

        for (let i = 0; i < files.length; i++) {
            this._processFile(files[i], cmdFFMPEG, cmdDELETE);
        }

    }
}

new Converter().start();
