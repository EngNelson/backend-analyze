# How to Use the Application
# Backend Stack: NestJS Framwork[ Run: npm run start:dev].
# Frontend Stack: ReactJS Framwork[RUN: npm start].

  Open the Application:

# Navigate to http://localhost:3000 in your web browser to open the frontend application.
Analyze a URL:

Enter a valid URL into the input field.
Click the "Analyze" button.
View Results:

=> The application will send a request to the backend server to analyze the URL.

=> The results, including HTML version, page title, number of headings, number of internal and external links, and the presence of a login form, will be displayed in a tabular format below the form.

=> Assumptions and Design Decisions
HTML Parsing: The solution uses cheerio to parse HTML documents and extract required information efficiently.

=>CORS: CORS is enabled on the backend to allow communication with the frontend during development.

=>URL Validation: The backend assumes the provided URL is reachable and returns a valid HTML document.

=>Login Form Detection: The logic for detecting login forms is based on common identifiers like "login" and "password" in form content.

=>Performance Considerations: For large-scale deployments, consider implementing caching mechanisms and optimizing HTML parsing.

=>Known Constraints and Limitations
Error Handling: The current implementation provides basic error handling for unreachable URLs or invalid HTML documents.




# How to Run The Unites Test.

=> Run the Tests with this commands:
# npm run test



