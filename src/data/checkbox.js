import getPlatform from "@/data/checkbox/platform.js";
import getCommunicationTool from "@/data/checkbox/communication_tool";

export default function (baseURL) {
  const checkBoxSets = {
    platform: getPlatform(baseURL),
    communicationTool: getCommunicationTool(baseURL)
  }
  return checkBoxSets
}
