import { compare, hash } from 'bcryptjs';
import { prisma } from '../../prisma';
import { sign } from 'jsonwebtoken';
import {
  Request,
  Response
} from 'express';

interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

async function findUserByEmail(p_email: string): Promise<UserType | null> {
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

  const payload = {
    id: user.id,
  };

  const token = sign(payload, String(process.env.API_PASSWORD));

  res.json({ token });

}

export const handleCreateUser = async (
  req: Request,
  res: Response,
) => {

  const {
    name,
    email,
    password
  } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw new Error("E-mail já está sendo utilizado");
  }

  const hashed_password = await hash(password, 8);

  const new_user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashed_password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  res.status(201).json(new_user);
}

export const handleGetListOfUsers = async (
  req: Request,
  res: Response
) => {

  const users = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  res.json({users});
}

export const handleGetUserDetails = async (
  req: Request,
  res: Response
) => {

  const userId = req.query.userId as string;

  const user = await prisma.users.findFirst({
    where: { id: Number(userId) },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  res.json({user});
}
