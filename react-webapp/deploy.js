// deploy.js
import FtpDeploy from 'ftp-deploy';
const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_SERVER,
  port: 21,
  localRoot: new URL('react-webapp/dist', import.meta.url).pathname, // Adjust path as needed
  remoteRoot: '/path/on/ftp/server',
  include: ['*'],
  deleteRemote: false
};

ftpDeploy.deploy(config, function (err, res) {
  if (err) console.log(err);
  else console.log('Deploy finished:', res);
});
