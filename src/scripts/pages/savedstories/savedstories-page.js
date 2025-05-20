import SavedStoriesPresenter from "./savedstories-presenter";
import * as StoriesAPI from "../../data/api.js";
import Database from "../../data/database.js";

export default class SavedStoriesPage {
  constructor() {
    this.presenter = new SavedStoriesPresenter({
      view: this,
      model: StoriesAPI,
      database: Database,
    });
    this.showError = this.showError.bind(this);
  }

  async render() {
    return `
      <section class="container">
        <h1>Saved Stories</h1>
      </section>

      <section id="saved-stories" class="container">
        <h2>Saved Stories</h2>
        <div id="saved-stories-list" class="stories-list"></div>
      </section>
    `;
  }

  renderSavedStories(stories) {
    const savedStoriesList = document.getElementById("saved-stories-list");
    savedStoriesList.innerHTML = `
      <div id="saved-stories-map" class="map" style="height: 400px; margin-bottom: 2rem;"></div>
    `;

    stories.array.forEach((story) => {
      const storyItem = document.createElement("div");
      storyItem.classList.add("story-item");
      storyItem.innerHTML = `
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <p>${story.createdAt}</p>
        <img src="${story.photoUrl}" alt="${story.name}" />
        <button class="delete-bookmark-button">Delete from bookmark</button>
      `;

      const deleteButton = storyItem.querySelector(".delete-bookmark-button");
      deleteButton.addEventListener("click", async () => {
        await this.presenter.deleteSavedStory(story);
        this.renderSavedStories(await this.presenter.getAllSavedStories());
      })
    });
    
  }
  
  showError(message) {
    alert("Error: " + message);
    console.log(message);
  }
}
