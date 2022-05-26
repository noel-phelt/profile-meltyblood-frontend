const historyArray = [
  "同人版月姫から",
  "旧作メルブラから",
  "リメイク版月姫から",
  "メルブラTLから",
]

const history = historyArray.map(
  (value, index) =>
  (
    {
      id: index + 1,
      name: value,
    }
  )
)


export {
  history
}
