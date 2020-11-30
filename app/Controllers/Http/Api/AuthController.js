"use strict";

const { validate } = use("Validator");
const Device = use("App/Models/Device");

class AuthController {
  async signIn({ request, response, auth }) {
    const rules = {
      name: "required",
      pin: "required",
    };

    const { name, pin } = request.only(["name", "pin"]);
    const validation = await validate({ name, pin }, rules);

    if (!validation.fails()) {
      try {
        const authResponse = await auth.attempt(name, pin);
        return response.status(200).send({
          status: 200,
          token: authResponse,
        });
      } catch (error) {
        response.status(401).send({
          status: 401,
          error: error.message,
        });
      }
    } else {
      response.status(401).send({
        status: 401,
        error: validation.messages(),
      });
    }
  }

  async register({ request, response }) {
    const rules = {
      name: "required|unique:devices,name",
      pin: "required",
    };

    const { name, pin } = request.only(["name", "pin"]);
    const validation = await validate({ name, pin }, rules);

    if (!validation.fails()) {
      try {
        const device = await Device.create({ name, pin });
        return response.status(201).send({
          status: 201,
          message: "Device has ben created",
        });
      } catch (error) {
        response.status(401).send({
          status: 400,
          message: error.message,
        });
      }
    } else {
      response.status(401).send({
        status: 401,
        error: validation.messages(),
      });
    }
  }
}

module.exports = AuthController;
