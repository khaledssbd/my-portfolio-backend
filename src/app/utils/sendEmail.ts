import nodemailer from 'nodemailer';
import config from '../config';
import fs from 'fs';
import path from 'path';

type TEmail = {
  subject: string;
  to: string;
  fileName: string;
  buttonLink: string;
  userName?: string;
  rentalAddress?: string;
};

export const sendEmail = async ({
  subject,
  to,
  fileName,
  buttonLink,
  userName,
  rentalAddress,
}: TEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.googleMailServiceEmail,
      pass: config.googleMailServicePass,
    },
  });

  // const templatePath = path.join(__dirname, fileName);
  const templatePath = path.join(
    process.cwd(),
    'public',
    'emailTemplates',
    fileName,
  );
//  const templatePath = path.join(
//    __dirname,
//    '..',
//    'public',
//    'emailTemplates',
//    fileName,
//  );


  let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

  htmlTemplate = htmlTemplate.replace('{{buttonLink}}', buttonLink);

  if (userName) {
    htmlTemplate = htmlTemplate.replace('{{UserName}}', userName);
  }
  if (rentalAddress) {
    htmlTemplate = htmlTemplate.replace('{{RentalAddress}}', rentalAddress);
  }

  await transporter.sendMail({
    // from: config.googleMailServiceEmail, // sender address
    from: `${config.preffered_website_name} 🏡 <${config.googleMailServiceEmail}>`,
    to, // list of receivers
    subject: subject, // Subject line
    // text: '',
    html: htmlTemplate,
  });
};
