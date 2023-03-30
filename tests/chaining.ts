import { XMLElement } from "./../src/XMLElement";
const song = new XMLElement("song");

const titles = new XMLElement("titles");
const title = new XMLElement(
  "title",
  [{ attribute: "lang", value: "en" }],
  "Amazing Grace"
);
titles.addChild(title);

const lyrics = new XMLElement("lyrics");
const verse1 = new XMLElement("verse").setText(
  "Amazing grace, how sweet the sound"
);
const verse2 = new XMLElement("verse").setText("That saved a wretch like me");
lyrics.addChildren([verse1, verse2]);

song.addChildren([titles, lyrics]);
const xml = song.toXML();
console.log(xml);
