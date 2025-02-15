import { Client, Account } from "appwrite";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const client = new Client();
  client
    .setEndpoint("http://cloud.appwrite.io/v1")
    .setProject(config.APPWRITE_PROJECT_ID);

  const account = new Account(client);

  return {
    provide: {
      appwriteClient: client,
      appwriteAccount: account,
    },
  };
});
