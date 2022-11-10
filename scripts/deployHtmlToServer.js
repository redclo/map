var client = require('scp2');

client.scp(
    'dist/', {
        host: '47.243.162.145',
        username: 'root',
        password: 'funeral@2022',
        path: '/var/www/love/maptest/',
    },
    function(err, sftp) {
        console.log('uploadError:', err);
        console.log('uploadSftp:', sftp);
    },
);