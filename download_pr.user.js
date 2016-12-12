// ==UserScript==
// @name         Clone Github Pullrequest
// @namespace    https://giodamelio.com
// @version      0.1
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
    const remoteBranch = document.querySelector('#partial-discussion-header > div.TableObject.gh-header-meta > div.TableObject-item.TableObject-item--primary > span.commit-ref.current-branch.css-truncate.user-select-contain.expandable.head-ref > span:nth-child(2)').innerHTML;
    outputCommands.push(`git fetch origin pull/${pullNumber}/head:${remoteBranch}`);
    outputCommands.push(`git checkout ${remoteBranch}`);

    // Join the output commands togather so they can be run
    GM_setClipboard(outputCommands.join('; '));
    alert('Commands copied to clipboard');
  };
})();
