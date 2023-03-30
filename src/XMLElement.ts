export class XMLElement {
  private element: string;
  private attributes: Attributes[] = [];
  private content: string | null;
  private children: XMLElement[] = [];
  private isSingleTag: boolean = false;

  constructor(element: string, attributes?: Attributes[], content?: string) {
    this.element = element;
    if (attributes) this.attributes = attributes;
    if (content) {
      this.isSingleTag = false;
      this.content = content;
    }
  }

  /**
   * Sets the text content of the XML element
   * @param content The text content of the XML element
   */
  setText(content: string) {
    this.content = content;
  }

  /**
   *
   * @returns The text content of the XML element
   */
  getText() {
    return this.content;
  }

  /**
   * Removes the text content of the element
   */
  removeText() {
    this.content = null;
  }

  /**
   * Adds a XML child to the element
   * @param XMLElement child
   */
  addChild(XMLElement: XMLElement) {
    this.children.push(XMLElement);
    this.isSingleTag = false;
  }

  /**
   * Removes child from the XML element
   * @param XMLElement Element to remove
   */
  removeChild(XMLElement: XMLElement) {
    this.children?.filter((child) => child != XMLElement);
  }

  /**
   * Removes all children elements
   */
  removeAllChildren() {
    this.children = [];
    this.isSingleTag = true;
  }

  /**
   * Add multiple children to the element
   * @param XMLElements
   */
  addChildren(XMLElements: XMLElement[]) {
    this.children.push(...XMLElements);
  }

  /**
   * Add attribute to the XML element
   * @param attribute
   */
  addAttribute(attribute: Attributes) {
    this.attributes.push(attribute);
  }

  /**
   * Removes attribute from the element
   * @param attribute Attribute to remove
   */
  removeAttribute(attribute: Attributes) {
    this.attributes.filter((attr) => attr != attribute);
  }

  /**
   * Removes all attributes from the element
   */
  removeAllAttributes() {
    this.attributes = [];
  }

  /**
   *
   * @returns All the attributes of the element
   */
  getAttributes() {
    return this.attributes;
  }

  /**
   *
   * @returns All children elements
   */
  getChildren() {
    return this.children;
  }

  /**
   * Add an array of atrributes to the element
   * @param attributes
   */
  addAttributes(attributes: Attributes[]) {
    this.attributes.push(...attributes);
  }

  /**
   *
   * @returns The XML element in string format
   */
  toXML(): string {
    let attributes = "";
    if (this.attributes) {
      attributes = this.attributes.reduce(
        (acc, attr, index) =>
          acc +
          `${attr.attribute}="${attr.value}"` +
          (index == this.attributes.length - 1 ? "" : " "),
        ""
      );
    }

    let children = "";
    if (this.children) {
      children = this.children.reduce((acc, child) => acc + child.toXML(), "");
    }

    let startTag = `<${this.element} ${attributes} ${
      this.isSingleTag ? "/" : ""
    }>`;
    let endTag = `</${this.element}>`;

    return this.isSingleTag
      ? startTag
      : startTag + (this.content ?? "") + children + endTag;
  }
}

export type Attributes = {
  attribute: string;
  value: string;
};
