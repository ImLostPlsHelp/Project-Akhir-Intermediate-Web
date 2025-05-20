export default class SavedStoriesPresenter {
    #view;
    #model;
    #database;

    constructor({ view, model, database }) {
        this.#view = view;
        this.#model = model;
        this.#database = database;
    }

    async getAllSavedStories() {
        const savedStories = await this.#database.getAllStories();
        if (savedStories.length > 0) {
            return savedStories;
        } else {
            throw new Error("No saved stories found");
        }
    }

    async deleteSavedStory(story) {
        try {
            await this.#database.removeStory(story);
            this.#view.renderSavedStories(await this.getAllSavedStories());
        } catch (error) {
            this.#view.showError(error.message);
        }
    }
}