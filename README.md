# GABA

This is the main code base for GABA

## To run the script in development mode (Windows):

- Download NodeJS here : https://nodejs.org/en/download/
- Open CMD (if you don't know how, please follow the instructions at : https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/#:~:text=Press%20Windows%2BR%20to%20open,open%20an%20administrator%20Command%20Prompt.)
- In the CMD window, navigate to the folder where you store the app (for example: D:\gaba-dev\) using `cd` command: `cd D:\gaba-dev\` (you might need to type `d:` first, for example : `d:` -> enter -> `cd D:\gaba-dev\` -> enter)
- Type : `npm install` -> enter
- After installation finished, type `npm start`
- The app will be run on your browser
- To test adding new users: please add the new user using the existing schema, and please also add new user in both "member_data" and "program_review" collections

## To run the script in development mode (Mac):

- Open Terminal
- navigate to or create a folder where you'd like to save the code for this project using `cd folderName`
- you can choose your Documents folder (for example) using `cd Documents`, then hit enter
- create a new folder in your desired location with `mkdir GABAcode`, then hit enter (you can name this folder whatever you'd like)
- on the GitHub page for this repo, copy the project repo link using the green button at the top of this page
- in your Terminal, type `git clone pasteURLHere`, hit enter
- this will clone or copy the repo code into your chosen folder
- next, type `npm install` to install the required packages to generate the React App
- this could take a while, but when it's done, run `npm start`
- this command will open a dev server in your browser - you may have to give Terminal permission
- when finished looking at the project in your browser, type `control + C` in Terminal to terminate the dev server
