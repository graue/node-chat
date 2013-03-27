A small chat server for Node.

Check out, go to directory, run `npm install` and `node index.js`.
Then surf to http://localhost:9992 in 2 or more browser tabs or browsers.

Users are identified only by a color that is randomly chosen when the page
loads. There is nothing to prevent a collision where multiple users have the
same color.

New messages arrive via long polling. Neither WebSockets nor any of the
wrapper Sock* libraries are used. The goal was to implement this chat server
using bare-bones Node, or as close to it as reasonably possible (Formidable
is used to parse POST requests).
