import { openDB } from "idb";

const DATABASE_NAME = "userstories";
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = "saved-stories";

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade: (database) => {
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: "id",
      autoIncrement: true,
    });
  },
});

const Database = {
  async getAllStories() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async addStory(story) {
    if(!Object.hasOwn(story, "id")) {
        throw new Error("`id` is required.");
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, story);
  },

  async removeStory(story) {
    if (!Object.hasOwn(story, "id")) {
        throw new Error("`id` is required.");
    }
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },

  // async getStory(id) {
  //   if (!id) {
  //       throw new Error("`id` is required.");
  //   }
  //   return (await dbPromise).get(OBJECT_STORE_NAME, id);
  // },
};

export default Database;
