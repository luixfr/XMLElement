export class XMLElement {
  private element: string;
  private attributes: Attribute[] = [];
  private content: string | null;
  private children: XMLElement[] = [];

  constructor(element: string, attributes?: Attribute[], content?: string) {
    this.element = element;
    if (attributes && attributes.length) this.attributes = attributes;
    if (content) {
      this.content = content;
    }
  }

  /**
   * Sets the text content of the XML element
   * @param content The text content of the XML element
   */
  setText(content: string) {
    this.content = content;
    return this;
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
    return this;
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
  }

  /**
   * Add multiple children to the element
   * @param XMLElements
   */
  addChildren(XMLElements: XMLElement[]) {
    this.children.push(...XMLElements);
    return this;
  }

  /**
   * Add attribute to the XML element
   * @param attribute
   */
  addAttribute(attribute: Attribute) {
    this.attributes.push(attribute);
    return this;
  }

  /**
   * Removes attribute from the element
   * @param attribute Attribute to remove
   */
  removeAttribute(attribute: Attribute) {
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
  addAttributes(attributes: Attribute[]) {
    this.attributes.push(...attributes);
    return this;
  }

  /**
   *
   * @returns The XML element in string format
   */
  toXML(): string {
    let attributes = "";
    const isSingleTag = !this.content && !this.children.length;

    if (this.attributes.length) {
      attributes = this.attributes.reduce(
        (acc, attr, index) =>
          acc +
          `${attr.attribute}${attr.value ? '="' + attr.value + '"' : ""}` +
          (index == this.attributes.length - 1 ? "" : " "),
        " "
      );
    }

    let children = "";
    if (this.children) {
      children = this.children.reduce((acc, child) => acc + child.toXML(), "");
    }

    let startTag = `<${this.element}${attributes}${isSingleTag ? "/" : ""}>`;
    let endTag = `</${this.element}>`;

    return isSingleTag
      ? startTag
      : startTag + (this.content ?? "") + children + endTag;
  }
}

export type Attribute = {
  attribute: string;
  value?: string;
};
