const yaml = require('yaml');
const fs = require('fs');

const _config = yaml.parse(fs.readFileSync('_config.fluid.yml', 'utf8'));
_config.gitalk.clientID = process.env.OAUTH_GITHUB_CLIENT_ID;
_config.gitalk.clientSecret = process.env.OAUTH_GITHUB_SECRET;
_config.web_analytics.leancloud.app_id = process.env.LEANCLOUD_APP_ID;
_config.web_analytics.leancloud.app_key = process.env.LEANCLOUD_APP_KEY;
_config.web_analytics.leancloud.server_url = process.env.LEANCLOUD_SERVER_URL;
fs.writeFileSync('_config.fluid.yml', yaml.stringify(_config));