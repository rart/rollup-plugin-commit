const { exec } = require('child_process');

function cleanName(name) {
  if (name.includes('/')) {
    const i = name.lastIndexOf('/');
    return name.substr(i + 1);
  }
  return name;
}

function commitMessage(tpl, file) {
  const now = new Date();
  const date = `${now.getFullYear()}.${now.getDate()}.${now.getDay()}`;
  const time = `${now.getHours()}:${now.getMinutes()}`;
  return tpl.replace('{file}', file).replace('{date}', date).replace('{time}', time);
}

function rollupPluginCommit(options) {
  const targets = options.targets || [];
  const message = options.message || 'Updates to {file} @ {date} {time}';
  return {
    name: 'rollup-plugin-commit',
    writeBundle(options) {
      const target = targets.find(target => Boolean(options[cleanName(target)]));
      if (target) {
        const callback = (op) => (error, stdout, stderr) => (error)
            ? console.error(stderr || `Failed to ${op} "${target}" \n ${error.cmd}. ${stdout ? ('\n' + stdout) : ''}`)
            : console.log(stdout || `Git ${op} successful for "${target}".`);
        exec(
          `git add ${target} ${
            '&&'
          } git commit ${target} -m "${commitMessage(message, cleanName(target))}"`,
          callback('add/commit')
        );
      }
    }
  };
}

module.exports = rollupPluginCommit;
