const rankArray = [
  "EXランク",
  "S+ランク",
  "Sランク",
  "A+ランク",
  "Aランク",
  "Bランク",
  "Cランク",
  "Dランク",
  "Eランク",
  "Fランク",
]

const rank = rankArray.map(
  (value, index) =>
  (
    {
      id: index + 1,
      name: value,
    }
  )
)

export {
  rank
}
