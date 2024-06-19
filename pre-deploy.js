const yaml = require('yaml');
const fs = require('fs');

const _config = yaml.parse(fs.readFileSync('_config.fluid.yml', 'utf8'));
_config.gitalk.clientID = process.env.OAUTH_GITHUB_CLIENT_ID;
_config.gitalk.clientSecret = process.env.OAUTH_GITHUB_SECRET;
fs.writeFileSync('_config.fluid.yml', yaml.stringify(_config));