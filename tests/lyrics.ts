import { XMLElement, Attribute } from "../src/XMLElement";

const amazingGrace = {
  titles: ["Amazing Grace"],
  authors: ["John Neewton"],
  languages: ["English"],
  lyrics: [
    {
      order: ["v1", "v2", "v3", "v4"],
      v1: [
        "Amazing grace how sweet the sound",
        "That saved a wretch like me",
        "I once was lost, but now I'm found",
        "Was blind but now I see",
      ],
      v2: [
        "Twas grace that taught my heart to fear",
        "And grace my fears relieved",
        "How precious did that grace appear",
        "The hour I first believed",
      ],
      v3: [
        "Through many dangers, toils, and snares",
        "I have already come",
        "This grace that brought me safe thus far",
        "And grace will lead me home",
      ],
      v4: [
        "When we've been here ten thousand years",
        "Bright, shining as the sun",
        "We've no less days to sing God's praise",
        "Than when we first begun",
      ],
    },
  ],
};

let openLyrcsSong = new XMLElement("song");
let attributes: Attribute[] = [
  { attribute: "xmlns", value: "http://openlyrics.info/namespace/2009/song" },
  { attribute: "version", value: "0.8" },
];
openLyrcsSong.addAttributes(attributes);

const properties = new XMLElement("properties");
const titles = new XMLElement("titles");
const lang: Attribute = { attribute: "lang", value: amazingGrace.languages[0] };
const title = new XMLElement("title", [lang], amazingGrace.titles[0]);
titles.addChild(title);

const authors = new XMLElement("auhtors");
const auhtor = new XMLElement("auhtor", undefined, amazingGrace.authors[0]);
authors.addChild(auhtor);

const order = new XMLElement(
  "verseOrder",
  undefined,
  amazingGrace.lyrics[0].order.join(" ")
);

properties.addChild(titles);
properties.addChild(authors);
properties.addChild(order);

const lyrics = new XMLElement("lyrics");
const songLyrics = amazingGrace.lyrics[0];
for (const [verse, lines] of Object.entries(songLyrics)) {
  if (verse == "order") {
    continue;
  }

  const versexml = new XMLElement("verse", [
    { attribute: "name", value: verse },
    { attribute: "lang", value: "en" },
  ]);
  versexml.addChildren(
    lines.map((line) => new XMLElement("lines", undefined, line))
  );

  lyrics.addChild(versexml);
}

openLyrcsSong.addChild(properties);
openLyrcsSong.addChild(lyrics);

const xml = openLyrcsSong.toXML();
console.log(xml);
