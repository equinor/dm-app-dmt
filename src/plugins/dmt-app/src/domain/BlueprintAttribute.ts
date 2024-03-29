import { TAttribute } from '@development-framework/dm-core'

export class BlueprintAttribute {
  public attr: TAttribute

  constructor(attr: TAttribute) {
    this.attr = attr
  }

  public getName(): string {
    return this.attr.name
  }

  public getPrettyName(): string {
    return this.attr.name.charAt(0).toUpperCase() + this.attr.name.substr(1)
  }

  public isPrimitive(): boolean {
    //todo use AttributeTypes enum, available in the blueprint.
    return ['string', 'number', 'integer', 'boolean'].includes(
      this.attr.attributeType as string
    )
  }

  public toString(): string {
    return JSON.stringify(this.attr)
  }
}
