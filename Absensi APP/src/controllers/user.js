const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const moment = require("moment");
const private_key = process.env.private_key;
const url_image = process.env.URL_IMAGE;

const userController = {
  insertUser: async (req, res) => {
    try {
      const { name, address, email, password, company_id } = req.body;
      // const salt = bcrypt.gemSalt(10);

      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      await db.User.create({
        name,
        address,
        email,
        password: hashPassword,
        company_id,
      });
      return await db.User.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const { emna, password } = req.query;
      const user = await db.User.findOne({
        where: {
          [Op.or]: [
            {
              name: emna,
            },
            {
              email: emna,
            },
          ],
        },
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        console.log(match);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const token = jwt.sign(payload, private_key, {
            expiresIn: "1d",
          });

          console.log(token);

          return res.send({
            message: "login berhasil",
            value: user,
            token: token,
          });
        } else {
          throw new Error("login gagal password salah");
        }
      } else {
        return res.send({
          message: "login gagal email/username belum terdaftar",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getUser2: async (req, res) => {
    try {
      const { emna, password } = req.query;
      const user = await db.User.findOne({
        where: {
          [Op.or]: [
            {
              name: emna,
            },
            {
              email: emna,
            },
          ],
        },
      });
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        console.log(match);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const token = await db.Token.create({
            expired: moment().add(1, "days").format(),
            token: nanoid(),
            payload: JSON.stringify(payload),
            valid: true,
          });
          return res.send({
            message: "login berhasil",
            value: user,
            token: token.dataValues.token,
          });
        } else {
          throw new Error("login gagal");
        }
      } else {
        return res.send({
          message: "login gagal",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getByToken: async (req, res) => {
    const { token } = req.query;
    let user = jwt.verify(token, private_key);
    user = await db.User.findOne({
      where: {
        id: user.id,
      },
    });
    delete user.dataValues.password;
    res.send(user);
  },
  getByToken2: async (req, res, next) => {
    try {
      const { token } = req.query;
      let p = await db.Token.findOne({
        where: {
          [Op.and]: [
            {
              token,
            },
            {
              expired: {
                [Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                [Op.lte]: moment().add(1, "d").format(),
              },
            },
          ],
        },
      });
      console.log(moment().format());
      if (!p) {
        throw new Error("token has expired");
      }
      console.log(p.dataValues);
      user = await db.User.findOne({
        where: {
          id: JSON.parse(p?.dataValues?.payload).id,
        },
      });
      delete user.dataValues.password;
      req.user = user;
      next();
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getUserByToken: async (req, res) => {
    res.send(req.user);
  },
  forgetPass: async (req, res) => {
    try {
      const { emna } = req.query;
      const user = await db.User.findOne({
        where: {
          email: emna,
        },
      });
      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD",
            },
          }
        );
        const payload = {
          id: user.dataValues.id,
        };
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(1, "d").format(),
          token: generateToken,
          payload: JSON.stringify(payload),
          status: "FORGOT-PASSWORD",
        });

        mailer({
          subject: "hello",
          to: "akulaku@fullangle.org",
          text: url + token.dataValues.token,
        });

        return res.send({
          message: "silahkan check email anda",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  changePass: async (req, res) => {
    try {
      const { token } = req.query;
      const { password } = req.body;
      const { id } = req.user;
      const hashPassword = await bcrypt.hash(password, 10);
      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      await db.User.findOne({
        where: {
          id,
        },
      }).then((result) => {
        res.send(result);
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  uploadAvatar: async (req, res) => {
    const { filename } = req.file;
    await db.User.update(
      {
        avatar_url: url_image + filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => res.send(result));
  },
};

module.exports = userController;
