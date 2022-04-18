# react-ssr-nodejs
Implementing React SSR with NodeJS + ExpressJS. I'll be using Webpack as the bundler at both client and server sides, and ejs for HTML templating.

## Client Side
The primary objective at the client side is to get the entire component tree, and pass it to ReactDOM.hydrate() function which basically checks for server-rendered markup and attaches only the **event handlers** to it.

As soon as we run **npm run build:client**, `client.<hash>.js` file is created inside `dist/static`.

Along with that, a `manifest.json` file is also created by the Manifest plugin which keeps track of which generated file maps to which original filename.

In this way client javascript is created which is essential for interactivity of our React App.

## Server Side
I have created an express server which -
1. Get the client code from `static/` folder.
2. Listen to all routes.
3. Checks which route is the active one.
4. Place the call to fetch initial data for the route.
5. Create the component string using `ReactDOMServer.renderToString()`.
6. Pass the client code, component string and initial value obtained from call to fetch initial data to the **ejs** template.
7. An HTML with the template and values filled will be returned from the server.

As soon as we run **npm run build:server**, a minified `server.js` file is created in dist.

As well as, the `views` folder (which contains ejs templates) inside `server` is copied onto `dist` by the copy webpack plugin.

## Routing
As server will only provide us with the markup that needs to be rendered initially, it contains a **StaticRouter** where a location is fixed.

At the client side, however, routing is implemented as usual via **BrowserRouter**.

## Steps to run the app
1. Clone the project.
2. Open cmd at the folder where your project resides.
3. Do a **npm install**
4. Run - **npm run build:client**
5. Run - **npm run build:server**
6. Run - **npm run start**
7. Open `localhost:3000` in a browser window.

## References
Referred two articles -
1. https://nils-mehlhorn.de/posts/typescript-nodejs-react-ssr
2. https://ui.dev/react-router-server-rendering


