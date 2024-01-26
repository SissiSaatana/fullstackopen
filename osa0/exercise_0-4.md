sequenceDiagram
participant browser
participant server

    note over browser: user
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->>browser: HTTP status code 302 Found & redirect
    note over server: Redirect to location /exampleapp/notes which initiates the following GET request


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: The html document has two depencies "main.css" and main.js".
    Note right of browser: The browser starts resolving these when found via following get requests.
    Note right of browser: Note that the following get request can be launched before the previous is resolved

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Status code 200 & the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note over browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "hello world", "date": "2023-5-10" }]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
