export type AttributeType = {
  trait_type: string, value: any}
  
export default function attributesParse(attributes: Array<AttributeType>) {
  const parsedAttributes: {[key: string] : string | number} = {};
  for (const attribute of attributes) {
    let key = attribute.trait_type.replace(/\s+/g, '-').toLowerCase();
    if(key == "serialnumber")
      key = "serial"
    const value = attribute.value;
    parsedAttributes[key] = value;
  }
  return parsedAttributes;
}