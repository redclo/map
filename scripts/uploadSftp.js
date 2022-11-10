'use strict';

var ClientLib = require('scp2');

var client = new ClientLib.Client();

function UploadSftp(options) {
  this.options = options;
}

UploadSftp.prototype.apply = function (callbck) {
  var self = this;

  var remotePath = self.options.remotePath;
  var path = self.options.path;
  var username = self.options.username;
  var host = self.options.host;
  var password = self.options.password;
  var port = self.options.port || '22';
  var verbose = self.options.verbose;

  var startTime;
  var endTime;

  client.on('connect', function () {
    // console.log('connected');
  });

  client.on('ready', function () {
    // console.log('ready');
    startTime = new Date();
    console.log('[Start Uploading] ' + startTime);
  });

  client.on('transfer', function (buf, up, total) {});

  client.on('write', function (p) {
    if (verbose) {
      console.log('Transfer ' + p.source + ' => ' + p.destination);
    }
  });

  client.on('end', function () {
    endTime = new Date();
    console.log('[End Uploading] ' + new Date());
  });

  client.on('error', function (err) {
    console.log('[Error] ' + err);
  });

  client.on('close', function () {
    console.log(
      'Transfer with SFTP Completed in [' +
        (+endTime - +startTime) / 1000 +
        '] seconds!',
    );

    callbck && callbck();
  });

  var srcPath = path;
  var destPath =
    username + ':' + password + '@' + host + ':' + port + ':' + remotePath;

  uploadByDir(srcPath, destPath, client);
};

/**
 * [uploadByDir: Upload Directory Directory & Cannot Get Detailed Uploading Info for Files]
 * @param  {[String]} src    [description]
 * @param  {[String]} dest   [description]
 * @param  {[Object]} client [description]
 */
function uploadByDir(src, dest, client) {
  ClientLib.scp(src, dest, client, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = UploadSftp;
