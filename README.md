# Introduction

This repository holds the code for my image downloading extension.

# Getting started

Run `pnpm install` in the root directory.

To build for Firefox run `pnpm build:firefox`. The compiled files will be put in the **dist**-folder.

# Debugging in VS Code

Install the **Debugger for Firefox** VS Code extension, select **Launch Firefox Extension** in Run and Debug, and press **F5**. The pre-launch task starts `pnpm dev:firefox`, waits for the first development build, and launches the extension from **dist** with source maps enabled.

Open the extension page you want to debug. Changes to source files are rebuilt and the relevant extension page reloads automatically while the watcher is running. Stop the watcher from its task terminal when you are done.

This was tested using pnpm 8.9.2 on Windows 11 using Visual Studio Code.