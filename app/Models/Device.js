"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Device extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the device pin before saving
     * it to the database.
     */
    this.addHook("beforeSave", 'DeviceHook.hashPin');
  }
}

module.exports = Device;
