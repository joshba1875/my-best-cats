# my-best-cats
 A collection of my NextJs best cats

 - This is an example of a modern NextJs App (proof of concept) where users can upload images of their cats, favourite and up / down vote
 - The app makes basic use of Tailwind CSS in order to provide the bare minimum in terms of responsive design for different viewport sizes
 - Examples of error handling, I18N and A11Y are included but not applied consistently across the aplication due to time constraints

# Get started

- Pull down repo locally
- run `npm i`
- run `npm run build` (optional, but good practice)
- run `npm run dev`
- navigate to localhost:3000
- upload page has basic support for I18N, change the url to es-ES/upload to see a label and error message translate automatically into Spanish

# TODO

- Refactor page init, suspect there is a race condition here that is not visible since fetchCats typically takes the longest to resolve. Normalise model should be called when all promises resolve, not only when fetchCats has resolved (and set)
- Implement server-side routing for all external api requests
- Hide api key from client and decorate headers going to thecatapi from back-end
- Store and retrieve api key from a secret manager
- Add better styling and image preview functionality to /upload
- Add delete button to image cards
- Align Types to ensure consistent intefaces and typing
- Implement unit tests (Playwright for UI, Jest for Node)
- Implement SSG in order to pull cat images during build and ISR to refresh without full page reload
- Lift state management up to utilise context api (avoids having to pass setter down to child components to trigger refresh)
- Refactor votes calculation to use array.reduce((x,y) => {})
- Implement login and profile management functionality
- Add linting for code formatting standards
- Add husky for git commit hooks (commit formatting)