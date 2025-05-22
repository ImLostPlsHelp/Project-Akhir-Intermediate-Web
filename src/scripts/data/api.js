import CONFIG from "../config";

const ENDPOINTS = {
  GET_ALL_STORIES: `${CONFIG.BASE_URL}/stories`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  GET_STORY_BY_ID: (id) => `${CONFIG.BASE_URL}/stories/${id}`
};

export async function getAllStories() {
  try {
    const fetchResponse = await fetch(ENDPOINTS.GET_ALL_STORIES, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
      },
    });
    const json = await fetchResponse.json();

    return {
      ...json,
      ok: fetchResponse.ok,
    };
  } catch (error) {
    const cache = await caches.open('stories-cache');
    const cachedResponse = await cache.match(ENDPOINTS.GET_ALL_STORIES);
    
    if (cachedResponse) {
      return await cachedResponse.json();
    }
    
    throw error;
  }
}

export async function addStory(formData) {
  const fetchResponse = await fetch(ENDPOINTS.ADD_STORY, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CONFIG.ACCESS_TOKEN}`,
    },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function login(email, password) {
  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email, 
      password,
    }),
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function register(name, email, password) {
    const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getStoryById(id) {
  console.log("ini dari getStoryById " + id);
  const fetchResponse = await fetch(ENDPOINTS.GET_STORY_BY_ID(id), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  }
}