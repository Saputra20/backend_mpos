'use strict'

const Hash = use('Hash')

const DeviceHook = exports = module.exports = {}

DeviceHook.hashPin = async (deviceInstance) => {
    deviceInstance.pin = await Hash.make(deviceInstance.pin)
}
