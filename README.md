# lacrosse-web


## Update PostgreSQL for Restoring a Schema

1. In pgAdmin 4, navigate to `Servers > [Server Name] > Databases` and left click `Databases`.
2. On the Menu Bar at the top of the window, navigate to `File > Preferences > Binary Paths`.
3. Scroll down to the `PostgreSQL Binary Path` table.
4. Click the browse file icon in the `Binary Path` column of the `PostgreSQL 16` row.
5. Navigate to the drive you saved pgAdmin 4 `.\Program Files\PostgreSQL\16\bin\` and click the select folder button.
6. Set this as default and click the save button.

## PostgreSQL Schema Import

1. In pgAdmin 4, navigate to `Servers > [Server Name] > Databases > [Database Name] > Schemas > public`.
2. Right-click on `public` and click `Restore...`.
3. Click the browse file icon to change the `Filename` to the file path of `lacrosse_schema.sql` included in the repo.
4. Click the `Restore` button on the bottom of the window.

## Setup

1. First, install [nodejs](https://nodejs.org/en/download/). Use LTS 20.11.0 which uses `npm` version 10.2.4.
2. Open a terminal and run `$ git clone https://github.com/Y-o-p/lacrosse-web.git`
3. Run `$ cd lacrosse-web`
4. Run `$ npm install`

### VSCode

1. Run `$ code .` while still inside `lacrosse-web` to open it in VSCode.
2. Install the `Svelte` VSCode extension which it will prompt you for and enable the TypeScript plugin.

## Developing

Once you've installed the dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
