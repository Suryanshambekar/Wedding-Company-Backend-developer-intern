import { AuthService } from "../services/auth.service.js";

export const AuthController = {
  login: (master) => async (req, res, next) => {
    try {
      const token = await AuthService.login(master, req.body);
      res.json(token);
    } catch (e) {
      next(e);
    }
  },
};

