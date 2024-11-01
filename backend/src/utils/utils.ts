import nodemailer from "nodemailer";
import {UserFields} from "../../types";

// В этом файле можно удобно хранить утилиты.
// Например у вас будет много мест с проверкой данных приходящих с фронта
// если вам надо проверить значение на валидность
// Типа строка это или число или не нулл и тд
// Можно создать соответствующие функции. Тут уже на ваше усмотрение.

// Вот эту функцию можно переделать для более универсального использования.
// Вообще если у вас больше ни для чего не используется отправка емелов, то тогда не надо
// А если будет еще где-то использоваться в нескольких местах, то переделать и аргументами передавать нужные пропсы
// Пока можно и так оставить

export const sendMail = async (user: UserFields, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tenniskslt@gmail.com',
      pass: 'lwkf dumc iqyr rnoq',
    },
  });

  const resetUrl = `http://localhost:5173/reset-password/${token}`;
  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Сброс пароля',
    text:
      `Вы получили это письмо, потому что вы запросили сброс пароля для вашего аккаунта.\n\n` +
      `Пожалуйста, перейдите по следующей ссылке, чтобы сбросить ваш пароль:\n\n` +
      `${resetUrl}\n\n` +
      `Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};