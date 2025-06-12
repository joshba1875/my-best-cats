# my-best-cats
 A collection of my NextJs best cats

 - This is an example of a modern NextJs App (proof of concept) where users can upload images of their cats, favourite and up / down vote
 - The app makes basic use of Tailwind CSS in order to provide the bare minimum in terms of responsive design for different viewport sizes
 - Examples of error handling, I18N and A11Y are included but not applied consistently across the aplication due to time constraints

# Get started

- Pull down repo locally
- run `npm i`
- run `npm run dev`
- navigate to localhost:3000

# TODO

- Implement server-side routing for all external api requests
- Hide api key from client and decorate headers going to thecatapi from back-end
- Store and retrieve api key from a secret manager
- Align Types to ensure consistent intefaces and typing
- Implement unit tests (Playwright for UI, Jest for Node)
- Implement SSG in order to pull cat images during build and ISR to refresh without full page reload
- Implement login and profile management functionality