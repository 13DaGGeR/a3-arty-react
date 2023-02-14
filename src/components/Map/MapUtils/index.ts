import { CRS, LatLng, Point } from "leaflet";
import { IMapBounds } from "../../../utils/types";
import { isBackendAvailable } from "../../../utils/variables";

export const latLngToArmaCoords = (
  latLng: LatLng,
  maxZoom: number,
  mapExtent: number[],
  mapBounds: IMapBounds,
  crs: CRS = CRS.Simple
) => {
  const point = crs.latLngToPoint(latLng, maxZoom);
  const coords = new Point(point.x, Math.abs(mapExtent[1]) - point.y);

  const xPercent = coords.x / Math.abs(mapExtent[2]);
  const yPercent = coords.y / Math.abs(mapExtent[1]);

  const armaX = Math.round(mapBounds.x * xPercent);
  const armaY = Math.round(mapBounds.y * yPercent);

  return new Point(armaX, armaY);
};

export async function fetchHeightByCoordinates(mapName: string, x: number, y: number) {
  const roundedX = Math.round(x / 10) * 10;
  const roundedY = Math.round(y / 10) * 10;
  const endpoint = "http://127.0.0.1:3080/coords/";
  let height = 0;
  if (isBackendAvailable) {
    const json = await fetch(`${endpoint}${mapName.toLowerCase()}/${roundedX}.${roundedY}`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .catch(() => console.warn("Couldn't fetch height, setting height to 0"));
    height = json ? json.z : 0;
  }

  return height;
}
