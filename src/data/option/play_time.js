const playTimeArray = [
  "AM0時〜AM5時",
  "AM6時〜AM11時",
  "PM12時〜PM5時",
  "PM6時〜PM11時",
]

const playTime = playTimeArray.map(
  (value, index) =>
  (
    {
      id: index + 1,
      name: value,
    }
  )
)

export {
  playTime
}
