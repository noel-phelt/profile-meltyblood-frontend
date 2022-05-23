export default function (baseURL) {
  const communicationToolURL = baseURL + "communication_tool/"
  const communicationTool = [
    {
      id: 1, name: "Twitter", img: communicationToolURL + "Twitter.png",
      x: 29, y: 465, width: 45, height: 37
    },
    {
      id: 2, name: "Discord", img: communicationToolURL + "Discord.png",
      x: 29, y: 461, width: 40, height: 46
    },
    {
      id: 3, name: "LINE", img: communicationToolURL + "LINE.png",
      x: 29, y: 461, width: 43, height: 43
    },
    {
      id: 4, name: "Skype", img: communicationToolURL + "Skype.png",
      x: 29, y: 457, width: 50, height: 50

    },
  ]
  return communicationTool
}
