import SessionModel from "../models/session.models";

export async function createSession(userId: string, userAgent: string) {
  // Here we create a session with userId and userAgent
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}
