export default function (baseURL) {
  const character = baseURL + "character/"
  const card = baseURL + "profile_cards/"

  const characterArray = [
    "遠野志貴",
    "アルクェイド・ブリュンスタッド",
    "遠野秋葉",
    "シエル",
    "翡翠",
    "琥珀",
    "翡翠＆琥珀",
    "軋間紅摩",
    "有間都古",
    "ノエル",
    "ミハイル・ロア・バルダムヨォン",
    "ブローヴ・アルハンゲリ",
    "暴走アルクェイド",
    "セイバー",
    "死徒ノエル",
    "蒼崎青子",
    "マーリオゥ・ジャーロ・ベスティーノ",
    "完全武装シエル",
  ]

  const characters = characterArray.map(
    (value, index) =>
    (
      {
        id: index + 1, name: value,
        img: character + `${index + 1}.png`,
        card: card + `meltyblood_profile_card.${index + 1}.jpeg`
      }
    )
  )
  return characters
}




