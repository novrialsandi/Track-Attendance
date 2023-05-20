const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

const attlogController = {
	getAll: async (req, res) => {
		try {
			const { user_id } = req.query;
			const attendancelog = await db.Attendancelog.findAll({
				where: {
					[Op.and]: [
						{
							user_id: user_id,
						},
						{
							deletedAt: null,
						},
					],
				},
			});
			return res.send(attendancelog);
		} catch (err) {
			console.log(err);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getToday: async (req, res) => {
		try {
			const { user_id } = req.query;
			return await db.Attendancelog.findOne({
				where: {
					[Op.and]: [
						{
							user_id: user_id,
						},
						{
							createdAt: moment().format(),
						},
					],
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	insertAttlog: async (req, res) => {
		// kasih proteksi supaya tidak bisa post lagi jika clockin != Null
		try {
			const attendancelog = await db.Attendancelog.findOne({
				where: {
					[Op.and]: [
						{
							user_id: user_id,
						},
						{
							createdAt: {
								[Op.gt]: moment().format(),
							},
							createdAt: {
								[Op.lte]: moment().day(1).format(),
							},
							// moment().format(),
						},
					],
				},
			}).then((result) => {
				return result;
			});
			if (!attendancelog.length) {
				const { user_id } = req.body;
				console.log(req.body);

				await db.Attendancelog.create({
					clock_in: moment().format("hh:mm"),
					user_id,
				}).then((result) => res.send(result));
			} else {
				alert("anda sudah clockin");
			}
		} catch (err) {
			console.log(err);
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	editAttlog: async (req, res) => {
		//kasih protecsi jika clock out != null
		try {
			const attendancelog = await db.Attendancelog.findOne({
				where: {
					[Op.and]: [
						{
							user_id: user_id,
						},
						{
							createdAt: {
								[Op.gt]: moment().format(),
							},
							createdAt: {
								[Op.lte]: moment().day(1).format(),
							},
							// moment().format(),
						},
					],
				},
			}).then((result) => {
				return result;
			});

			const { user_id, id } = req.query;
			// const { clock_out } = req.body;
			// console.log();
			const now = moment().format("yyyy-MM-DD 00:00:00");
			console.log(now);
			console.log(req.query);
			await db.Attendancelog.update(
				{
					clock_out: moment().format("hh:mm"),
				},
				{
					where: {
						[Op.and]: [
							{
								user_id: user_id,
							},
							{
								createdAt: {
									[Op.gt]: now,
								},
							},
							{
								createdAt: {
									[Op.lte]: moment(now)
										.add(1, "days")
										.format(),
								},
							},
						],
					},
				}
			);

			return db.Attendancelog.findOne({
				where: {
					[Op.and]: [
						{
							user_id: user_id,
						},
						{
							createdAt: moment().format(),
						},
					],
				},
			}).then((result) => res.send(result));
		} catch (err) {
			console.log(err);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	deleteAttlog: async (req, res) => {
		try {
			const { user_id, id } = req.query;
			await db.Attendancelog.destroy({
				where: {
					[Op.and]: [
						{
							user_id: user_id,
						},
						{
							id: id,
						},
					],
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = attlogController;
