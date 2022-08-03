# spell-together
Compete to see who can create the most words using letters from the hive in this multiplayer modification of [The New York Times Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee).

## Requirements
- [Deno](https://deno.land/#installation)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Node](https://nodejs.org/en/)
- [Supabase CLI](https://supabase.com/docs/reference/cli/installing-and-updating)
- [WordsAPI](https://rapidapi.com/dpventures/api/wordsapi/) subscription on RapidAPI (optional: allows access to word definitions)

## How to Run
### 1. Server and Database
Provides a Postgres database and a RESTful API.
1. Make sure Docker is running
2. Run `supabase start`

### 2. Serverless Functions
Scrape puzzle data from the official spelling bee game.
1. Create a `.env.local` file
```
# supabase/.env.local
ENVIRONMENT=production
RAPID_API_KEY=4ca976ea...  # optional RapidAPI key for getting word definitions
```
2. Run `supabase functions serve load-puzzle --env-file ./supabase/.env.local` to get the function running locally
3. Run the following cURL request to trigger the function:
```
curl --request POST 'http://localhost:54321/functions/v1/load-puzzle' \
  --header 'Authorization: Bearer <SUPABASE_ADMIN_KEY>' \
  --header 'Content-Type: application/json'
```

### 3. Client
1. Change into the `web/` directory
2. Run `yarn install` to install dependencies
3. Create a `.env.local` file:
```
# web/.env.local
REACT_APP_SUPABASE_URL=http://localhost:54321  # Supabase API URL
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1N...  # Supabase anonymous public key
```
4. Run `yarn start`
     - the application should be available at http://localhost:3000