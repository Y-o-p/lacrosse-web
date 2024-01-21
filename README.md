# lacrosse-web

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
