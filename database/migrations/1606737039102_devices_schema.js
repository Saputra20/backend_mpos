'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DevicesSchema extends Schema {
  up () {
    this.create('devices', (table) => {
      table.increments()
      table.string('name' , 254).notNullable().unique()
      table.string('pin')
      table.string('latitude')
      table.string('longitude')
      table.timestamps()
    })
  }

  down () {
    this.drop('devices')
  }
}

module.exports = DevicesSchema
