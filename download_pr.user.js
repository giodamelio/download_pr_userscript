// ==UserScript==
// @name         Clone Github Pullrequest
// @namespace    https://giodamelio.com
// @version      0.2.0
// @description  Gives you the commands to clone a github pull request easily
// @author       Gio d'Amelio
// @match        https://github.com/*/*/pull/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
  'use strict';

  // Keep track of the output commands
  const outputCommands = [];

  // Add button to page
  const button = document.createElement('button');
  button.innerHTML = 'Clone Pull Request';
  button.className = 'btn btn-sm';
  document.body.getElementsByClassName('gh-header-title')[0].appendChild(button);

  // When the user clicks the button copy the commands
  button.onclick = function() {
    // Get the user, repo and pull number from the url
    const [_, user, repo, _1, pullNumber] = window.location.pathname.split('/');

    // Create the first command to pull the repo
    outputCommands.push(`git clone https://github.com/${user}/${repo}`);
    outputCommands.push(`cd ${repo}`);

    // Create the command to fetch and checkout the specific pull request
    const pullAuthorName = document.getElementsByClassName('author')[1].text.trim();
    outputCommands.push(`git fetch origin pull/${pullNumber}/head:${pullAuthorName}`);
    outputCommands.push(`git checkout ${pullAuthorName}`);

    // Join the output commands togather so they can be run
    GM_setClipboard(outputCommands.join('; '));
    alert('Commands copied to clipboard');
  };
})();
