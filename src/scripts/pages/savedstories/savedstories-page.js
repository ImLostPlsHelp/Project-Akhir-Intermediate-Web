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
        <div id="saved-stories-list" class="stories-list"></div>
      </section>
    `;
  }

  initMapSaved(stories) {
    const rasterTile = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const defaultLocation = [-7.2575, 112.7521];
    const map = L.map("saved-stories-map").setView(defaultLocation, 13);

    L.tileLayer(rasterTile, {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const markerGroup = L.featureGroup();

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).bindPopup(
          `<strong>${story.name}</strong><br>${story.description}`
        );
        markerGroup.addLayer(marker);
      }
    });

    markerGroup.addTo(map);

    if (markerGroup.getLayers().length > 0) {
      map.fitBounds(markerGroup.getBounds());
    }
  }

  renderSavedStories(stories) {
    const savedStoriesList = document.getElementById("saved-stories-list");
    savedStoriesList.innerHTML = `
      <div id="saved-stories-map" class="map" style="height: 400px; margin-bottom: 2rem;"></div>
    `;

    stories.forEach((story) => {
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

        savedStoriesList.appendChild(storyItem);
    });
    
    this.initMapSaved(stories);
  }
  
  showError(message) {
    alert("Error: " + message);
    console.log(message);
  }

  async afterRender() {
    try {
        const savedStories = await this.presenter.getAllSavedStories();
        console.log(savedStories);
        this.renderSavedStories(savedStories);
    } catch (error) {
        this.showError(error.message);
    }
  }
}
