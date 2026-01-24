Analyse the changes in this workspace and generate a concise commit message. Provide a single sequence of terminal commands to:

1. Stage and commit all changes to the current local branch.
2. Store the current branch name, then switch to the 'main' branch.
3. Merge the feature branch into 'main'.
4. Push 'main' to origin.
5. Delete the local feature branch.




git add . && \
git commit -m "Fix: Adjust filter chips visibility and scrolling behavior" && \
current_branch=$(git rev-parse --abbrev-ref HEAD) && \
git checkout main && \
git merge $current_branch && \
git branch -d $current_branch