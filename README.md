A coding assessment developed for ACCRUALIFY by NICK MYERS.

## Quick Overview

1. [TECH STACK]: TypeScript, Next.js14, TailwindCSS, Vercel (for web deployment)
2. Description: User's sign in to authenticated accounts via Google and can add, delete and view timesheets they create which are stored and fetched with API calls to an online Redis database.

## Features Accomplished
1. User's can enter a date and number of minutes [a line item]
2. Timesheets can hold infinitely many line items
3. Timesheets have and must include a "description"
4. A "total time" is calculated for each timesheet based on all minutes of each line item
5. User's are able to enter a rate for salary/cost
6. A "total cost" is calculated based on timesheet's total time * rate of pay/cost
7. User's are able to save, view, and delete timesheets after creating them
8. Program requires authentication to access
9. User timesheets are specific only to their account and cannot be viewed by other accounts

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

## Important note for local deployment
This project runs on secured environment variable NOT shared in the Git repository and thus the program
will not properly run without them.

These variables are:
```
1. UPSTASH_REDIS_REST_URL
2. UPSTASH_REDIS_REST_TOKEN
3. NEXTAUTH_SECRET
4. GOOGLE_CLIENT_ID
5. GOOGLE_CLIENT_SECRET
```

To solve this, import your own Upstash Redis database token/url, Google API client ID/Secret, and create your own NEXTAUTH_SECRET which can be any value you want for security.

## To test deployed version online

- Use link: [https://accrualify-timesheet.vercel.app/] 
