import nodemailer from "nodemailer";
import dotenv from "dotenv";
import db from "../../models/index";
import fs from "fs";
dotenv.config();
export type doner = {
  id: Number;
  nationalId: Number;
  name: String;
  city: String;
  email: String;
};

export const register = async (doner: doner): Promise<void> => {
  try {
    await db.Doner.create(doner);
  } catch (error) {
    throw new Error(error as string);
  }
};
export type option = {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
};
export type donation = {
  nationalId?: string;
  bloodType: string;
  donateDate?: string;
  expireDate?: string;
  DonerId?: Number;
  virusTest?: string;
};
export const donate = async (donation: donation) => {
  try {
    donation.donateDate = new Date().toLocaleString();
    const dateInMilSec = Date.now() + 42 * 24 * 60 * 60 * 1000; // expireDate in milsecond after 42 dayes = 6 weeks
    donation.expireDate = new Date(dateInMilSec).toLocaleString();
    delete donation.nationalId; //to only add pk field to make relation
    delete donation.virusTest;
    await db.BloodStock.create(donation);
  } catch (err) {
    throw new Error(err as string);
  }
};
const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS } = process.env;
export const sendEmail = async (options: option): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: EMAIL_HOST,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};
export const checkLastDonateDate = async (
  DonerId: Number
): Promise<boolean> => {
  try {
    const lastDonate: donation[] = await db.BloodStock.findAll({
      where: { DonerId },
      order: [["donateDate", "DESC"]],
      limit: 1,
    });
    return lastDonate[0]
      ? new Date(`${lastDonate[0].donateDate}`).getTime() +
          90 * 24 * 60 * 60 * 1000 >
          Date.now()
      : false;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const Doner = async (nationalId: string): Promise<doner> => {
  try {
    const doner: doner = await db.Doner.findOne({ where: { nationalId } });
    return doner;
  } catch (err) {
    throw new Error(err as string);
  }
};
export let periodTestMsg!: string;
export let VirusTestMsg!: string;
fs.readFile(
  `${__dirname}/../assets/templates/rejectVirus.template.html`,
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    VirusTestMsg = data;
  }
);
fs.readFile(
  `${__dirname}/../assets/templates/rejectPeriod.template.html`,
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    periodTestMsg = data;
  }
);
