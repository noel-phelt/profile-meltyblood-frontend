export default function (baseURL) {
  const platformURL = baseURL + "platform/"
  const platform = [
    {
      id: 1, name: "PS4", imgOn: platformURL + "PS4.png", imgOff: platformURL + "PS4_off.png",
      x: 29, y: 603, width: 85, height: 42
    },
    {
      id: 2, name: "Switch", imgOn: platformURL + "Switch.png", imgOff: platformURL + "Switch_off.png",
      x: 129, y: 603, width: 94, height: 42
    },
    {
      id: 3, name: "XboxOne", imgOn: platformURL + "XboxOne.png", imgOff: platformURL + "XboxOne_off.png",
      x: 237, y: 603, width: 121, height: 42
    },
    {
      id: 4, name: "Steam", imgOn: platformURL + "Steam.png", imgOff: platformURL + "Steam_off.png",
      x: 372, y: 603, width: 83, height: 42
    },
  ]
  return platform
}
