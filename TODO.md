## Packages
- Yarn as package manager
- Fastify as http server
- Typeorm for db creation/modification
- ??? for data validation
- Supertest for e2e testing
- Lerna for monorepo

## Gameplan
- [x] basic api for puzzle, records, rooms, and words
- [x] database
- [x] data validation
- [ ] websocket endpoints
- [ ] e2e testing
- [x] convert to monorepo
- [x] scraping tool
- [ ] scraping tool unit testing
- [ ] GUI
- [ ] package specific .env files

## Notes
- use `lerna add <package_name> packages/<core|server|web-client>` instead of `yarn add` for new dependencies

### Scoring
- Beginner: 0%
- Good Start: 2%
- Moving Up: 5%
- Good: 8%
- Solid: 15%
- Nice: 25%
- Great: 40%
- Amazing: 50%
- Genius: 70%

### Rules
- 4-letter words are worth 1 point each
- Longer words earn 1 point per letter
- Each puzzle includes at least one “pangram” which uses every letter
  - These are worth 7 extra points

### Wireframes
Desktop: https://wireframe.cc/HhdIC4
Mobile: https://wireframe.cc/p73MbN