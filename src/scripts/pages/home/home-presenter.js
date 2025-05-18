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

  async handleFormSubmit(formData) {
    try {
      const response = await this.#model.addStory(formData);
      if (response.ok) {
        this.#view.onStoryAdded();
      } else {
        this.#view.showError(response.message);
      }
    } catch (error) {
      this.#view.showError("Network error");
    }
  }

  async saveStoryToDatabase(story) {
    try {
      await this.#database.putStory(story);
      this.#view.saveToBookmarkSuccess("Story saved to bookmarks");
    } catch (error) {
      this.#view.showError(error.message);
    }
  }

}
