# XMLElement
A library to create XML text from JavaScript code

**Write Javascript**
```js
const song = new XMLElement("song")
song.addAttribute({attribute:"title", value:"Amazing Grace"})
song.setText("Amazing grace, how sweet the sound")

const xml = song.toXML()
console.log(xml)
```
**Get XML**
```xml
<song title="Amazing Grace">Amazing grace, how sweet the sound<song/>
```

## Installation

Run the following command
```
npm i xml-element
```

## Usage

`xml-element` exports `XMLElement` class and `Attribute` type
```js
import { XMLElement, Attribute } from "xml-element"
```

### The Attribute type
The `Attribute` type just defines the structure of an attribute
```ts
{
    attribute: string // attribute name
    value: string // value of the attribute (optional)
}
```
### The XMLElement Class
The `XMLElement` class represents a XML element and contains methods to add and remove attributes, children elements, and content

### XMLElement Constructor
You can use the constructor to set initial properties for the XML element

`element`: A string representing the name of the XML element.

`attributes`: An optional array of Attribute objects representing the attributes of the XML element.

`content`: An optional string representing the text content of the XML element.
```js
new XMLElement(
  "song",
  [
    { attribute: "title", value: "Amazing Grace" },
    { attribute: "lang", value: "English" },
    { attribute: "music"},
  ],
  "Amazing grace, how sweet the sound"
)
```
**Output**
```xml
<song title="Amazing Grace" lang="English" music>Amazing grace, how sweet the sound<song/>
```
### XMLElement Methods
`setText(content: string)`
* This method sets the text content of the XML element.

`getText(): string | null`
* This method returns the text content of the XML element.

`removeText()`
* This method removes the text content of the XML element.

`addChild(XMLElement: XMLElement)`
* This method adds a child XML element to the parent XML element.

`addChildren(XMLElements: XMLElement[])`
* This method adds an array of child XML elements to the parent XML element.

`getChildren(): XMLElement[]`
* This method returns an array of all child elements of the XML element.

`removeChild(XMLElement: XMLElement)`
* This method removes a child XML element from the parent XML element.

`removeAllChildren()`
* This method removes all child elements from the parent XML element.

`addAttribute(attribute: Attribute)`
* This method adds an attribute to the XML element.

`addAttributes(attributes: Attribute[])`
* This method adds an array of attributes to the XML element.

`getAttributes(): Attribute[]`
* This method returns an array of all attributes of the XML element.

`removeAttribute(attribute: Attribute)`
* This method removes an attribute from the XML element.

`removeAllAttributes()`
* This method removes all attributes from the XML element.

`toXML(): string`
* This method returns the XML element in string format.

## Examples

### A single tag XML element
When the XMLElement has no `content` or `children`, it creates a single tag XML element
```js
const song = new XMLElement("song")
song.addAttribute({attribute:"title", value:"Amazing Grace"})
song.toXML()

// <song title="Amazing Grace"/>
```
### Nested Elements
Use the `addChild` and the `addChildren` methods to nest elements inside another element

```js
const song = new XMLElement("song")

const titles = new XMLElement("titles")
const title = new XMLElement("title",[{attribute:"lang", value:"en"}], "Amazing Grace")
titles.addChild(title)

const lyrics = new XMLElement("lyrics")
const verse1 = new XMLElement("verse").setText("Amazing grace, how sweet the sound")
const verse2 = new XMLElement("verse").setText("That saved a wretch like me")
lyrics.addChildren([verse1, verse2])

song.addChildren([titles, lyrics])
const xml = song.toXML()
console.log(xml)
```
**Output**
```xml
<song>
    <titles>
        <title lang="en">Amazing Grace</title>
    </titles>
    <lyrics>
        <verse>Amazing grace, how sweet the sound</verse>
        <verse>That saved a wretch like me</verse>
    </lyrics>
</song>
```
