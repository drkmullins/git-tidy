var git = require('simple-git')();

function deleteLocalBranch(branchName) {
  git.deleteLocalBranch(branchName, function (error) {
    if (error) console.error('Error deleting branch ' + branchName)
    else console.log('Deleted ' + branchName);
  });
}

function cleanLocalBranches(branches) {
  var anyBranchDeleted = false;
  Object.keys(branches).forEach(function (branchName) {
    var branch = branches[branchName];
    if (branch.label.indexOf(': gone]') !== -1) {
      deleteLocalBranch(branchName);
      anyBranchDeleted = true;
    }
  });
  if (!anyBranchDeleted) console.info('Local branches are already tidy!')
}

module.exports = function () {
  console.log('Finding local branches that no longer exist in remote...')
  git.fetch('-p').branch(['-vv'], function (error, branchSummary) {
    if (error) console.error('Error retrieving branches');
    else {
      cleanLocalBranches(branchSummary.branches);
    }
  });
}
