import getCommunicationTool from "@/data/checkbox/communication_tool.js";
import getCharacters from "@/data/character.js";
import { optionSets } from "@/data/option_set.js";
import getCheckBox from "@/data/checkbox.js";

export default (context, inject) => {
  const baseURL = `${context.$config.storageURL}/`

  const communicationTool = getCommunicationTool(baseURL)
  const characters = getCharacters(baseURL)
  const options = optionSets
  const checkbox = getCheckBox(baseURL)

  inject('staticURL', baseURL)
  inject('characters', characters)
  inject('DEFAULT_PROFILE_CARD', baseURL + "profile_cards/" + "meltyblood_profile_card.0.jpeg")
  inject('optionSets', options)
  inject('communicationTool', communicationTool)
  inject('checkbox', checkbox)
}

