import { GreenZoneNode } from "./GreenZoneNode";

export class City {
  constructor(name) {
    this.name = name;
    this.zonesRoot = null; 
  }


  addZone(zoneName, parentName = null) {
    if (!this.zonesRoot) {
      this.zonesRoot = new GreenZoneNode(zoneName);
      return this.zonesRoot;
    }

    const trimmedParent = parentName ? parentName.trim() : "";

    if (!trimmedParent) {
      const newZone = new GreenZoneNode(zoneName);
      this.zonesRoot.addChild(newZone);
      return newZone;
    }

    const parentNode = this.zonesRoot.findZone(trimmedParent);
    if (!parentNode) {
      console.warn("No se encontro la zona padre:", trimmedParent);
      return null;
    }

    const newZone = new GreenZoneNode(zoneName);
    parentNode.addChild(newZone);
    return newZone;
  }

  editZoneName(oldName, newName) {
    if (!this.zonesRoot) return false;

    const node = this.zonesRoot.findZone(oldName);
    if (!node) {
      return false;
    }

    node.name = newName;
    return true;
  }

  getTotalZones() {
    if (!this.zonesRoot) return 0;
    return this.zonesRoot.countZones();
  }

  getZonesHeight() {
    if (!this.zonesRoot) return 0;
    return this.zonesRoot.height();
  }

  serialize() {
    return {
      name: this.name,
      zones: this.zonesRoot ? this.zonesRoot.serialize() : null,
    };
  }

  loadFromData(zonesData) {
    if (!zonesData) {
      this.zonesRoot = null;
      return;
    }
    this.zonesRoot = GreenZoneNode.deserialize(zonesData);
  }
}
