import { compare } from 'bcryptjs';
import { prisma } from '../../prisma';

export {
  Request,
  Response
} from 'express';

async function findUserByEmail(p_email: string) {
  const user = await prisma.users.findFirst({
    where: { email: p_email }
  });

  return user;
}

async function findUserById(p_id: number) {
  const user = await prisma.users.findFirst({
    where: { id: p_id }
  });

  return user;
}

export const handleSignIn = async (
  req: Request,
  res: Response
) => {

  const {
    email,
    password
  } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("E-mail ou senha inválidos");
  }

  const matched_password = await compare(password, user.password);

  if (!matched_password) {
    throw new Error("E-mail ou senha inválidos");
  }

  

}
