A coding assessment developed for ACCRUALIFY by NICK MYERS.

## Quick Overview

1. [TECH STACK]: TypeScript, Next.js14, TailwindCSS
2. Backend features:
       - Uploading, fetching, and deletion of user authenticated timesheets in an online Redis database.
       - Makes API calls to Google Accounts for user account creation
       - Makes API calls to a Redis database 
4. Frontend features:


## To deploy on your local environment

1. Install latest version of Node.js
    ```bash
    sudo apt update
    sudo apt install nodejs
    node -v
    # node -v checks successful installation of Node.js
    sudo apt install npm
    ```
2. Install npm package runner, npx
    ```bash
    npm install -g npx
    ```
3. Pull git repo to your local environment
4. Once in .../accrualify-timesheet, run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## To test deployed version online

- Use link: [https://accrualify-timesheet.vercel.app/] 
