export default class AddStoryPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async handleFormSubmit(formData) {
    try {
      this.#view.showLoading(true);
      const response = await this.#model.addStory(formData);
      if (response.ok) {
        this.#view.onStoryAdded();
      } else {
        this.#view.showError(response.message);
      }
    } catch (error) {
      this.#view.showError("Network error");
    } finally {
      this.#view.showLoading(false);
    }
  }

  async handlePushNotificationToggle() {
    try {
      const isSubscribed = await this.#view.checkPushNotificationStatus();
      if (isSubscribed) {
        await this.#view.unsubscribeFromPushNotification();
        this.#view.updateSubscribeButton(false);
      } else {
        await this.#view.subscribeToPushNotification();
        this.#view.updateSubscribeButton(true);
      }
    } catch (error) {
      this.#view.showError("Failed to handle push notification: " + error.message);
    }
  }
}