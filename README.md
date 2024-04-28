# lacrosse-web

## Setup

1. First, install [nodejs](https://nodejs.org/en/download/). Use LTS 20.11.0 which uses `npm` version 10.2.4.
2. Also install [PostgreSQL](https://sbp.enterprisedb.com/getfile.jsp?fileid=1258893) and add pgAdmin in the installation process
3. `cd` into the project directory
4. Run `$ npm install`
5. Run `$ npm i -D unplugin-icons`
6. Run `$ npm i -D @iconify/json`

### Update PostgreSQL for Restoring a Schema

1. In pgAdmin 4, navigate to `Servers > [Server Name] > Databases` and left click `Databases`.
2. On the Menu Bar at the top of the window, navigate to `File > Preferences > Binary Paths`.
3. Scroll down to the `PostgreSQL Binary Path` table.
4. Click the browse file icon in the `Binary Path` column of the `PostgreSQL 16` row.
5. Navigate to the drive you saved pgAdmin 4 `.\Program Files\PostgreSQL\16\bin\` and click the select folder button.
6. Set this as default and click the save button.

### PostgreSQL Schema Import

1. In pgAdmin 4, navigate to `Servers > [Server Name] > Databases > [Database Name] > Schemas > public`.
2. Right-click on `public` and click `Restore...`.
3. Click the browse file icon to change the `Filename` to the file path of `lacrosse_schema.sql` included in the repo.
4. Click the `Restore` button on the bottom of the window.

## Developing

Once you've installed the dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
