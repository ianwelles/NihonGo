# Git Workflow Prompts

## 1. Feature Clean-up (Merge & Delete)
**Goal:** Merge 'dev' into 'main' and remove 'dev'.

**Phase 1 (Merge):**
> "Generate the terminal commands to switch to the 'main' branch, merge the 'dev' branch into it, and push the updated 'main' branch to the remote origin."

**Phase 2 (Delete - only after success):**
> "Generate the terminal commands to delete the 'dev' branch locally and delete the 'dev' branch from the remote origin."

## 2. AI Commit & Push
**Goal:** Stage all changes, generate a commit message using AI, and push.

**Prompt:**
> "Analyse the file changes in this workspace. Generate a concise commit message summarising these modifications, then provide the terminal commands to stage all changes, commit using that generated message, and push to origin."