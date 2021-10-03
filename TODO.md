Packages:
- Yarn as package manager
- Fastify as http server
- Typeorm for db creation/modification
- ??? for data validation
- Supertest for e2e testing
- Lerna for monorepo

Gameplan:
- [ ] basic api for puzzle, records, rooms, and words
- [x] database
- [ ] data validation
- [ ] websocket endpoints
- [ ] e2e testing
- [ ] convert to monorepo
- [ ] scraping tool
- [ ] scraping tool unit testing
- [ ] GUI

Notes:
- use `lerna add` instead of `yarn add` for new dependencies