import * as L from "leaflet";

const errorScreen = document.getElementById("error-screen");
let errorText = document.getElementById("error-text")!.textContent;
const loadingContainer = document.getElementById("loading-screen");

console.log(errorText); // to prevent production error
type Coordinates = [number, number];

const initializerFunc = async (): Promise<void> => {
  try {
    const coords = await getUserCoords();
    coords && getMap(coords);
  } catch (error) {
    showError(`An error occured: ${error}`);
    console.error(error);
  } finally {
    hideLoading();
  }
};

const hideLoading = (): void => {
  loadingContainer?.classList.remove("block");
  loadingContainer?.classList.add("hidden");
};

const showError = (message: string): void => {
  errorText = message;
  errorScreen?.classList.remove("hidden");
  errorScreen?.classList.add("flex");
};

const getUserPosition = (): Promise<GeolocationPosition> => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      { enableHighAccuracy: true }
    );
  });
};

const getMap = (coords: Coordinates): void => {
  const map = L.map("map").setView(coords, 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  L.marker(coords).addTo(map);
};

const getUserCoords = async (): Promise<Coordinates | undefined> => {
  try {
    const position = await getUserPosition();
    const { latitude, longitude } = position.coords;
    return [latitude, longitude];
  } catch (error) {
    error instanceof GeolocationPositionError &&
      showError(error.message || "An error occured while getting coordinates");
    return;
  }
};

window.addEventListener("load", initializerFunc);
