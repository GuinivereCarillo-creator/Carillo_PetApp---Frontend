import type { BreedResponse, PhotoResponse } from "./types";

const readBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    throw new Error("VITE_API_URL is missing in the .env file.");
  }

  return url.replace(/\/+$/, "");
};

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${readBaseUrl()}${path}`, {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error(`The backend returned status ${response.status}.`);
  }

  return (await response.json()) as T;
};

export const loadBreeds = (): Promise<BreedResponse> =>
  request<BreedResponse>("/api/breeds");

export const loadPhoto = (breed: string): Promise<PhotoResponse> =>
  request<PhotoResponse>(`/api/photo?breed=${encodeURIComponent(breed)}`);
