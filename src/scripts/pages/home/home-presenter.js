export default class HomePresenter {
  #view;
  #model;
  #database;

  constructor({ view, model, database }) {
    this.#view = view;
    this.#model = model;
    this.#database = database;
  }

  async getAllStories() {
    const response = await this.#model.getAllStories();
    if (response.ok) {
      return response;
    } else {
      throw new Error("Failed to fetch stories");
    }
  }

  async saveStoryToDatabase(story) {
    try {
      console.log(story);
      console.log(story.id);
      const saveStory = await this.#model.getStoryById(story.id);
      console.log(saveStory);
      await this.#database.addStory(saveStory.story);

      this.#view.saveToBookmarkSuccessfully('Success to save to bookmark');
    } catch (error) {
      this.#view.showError(error.message);
    }
  }
}
