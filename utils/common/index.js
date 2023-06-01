import { paginationLimit } from "../../constants/index.js";

export const $skip = (page) => (page ? (+page - 1) * paginationLimit : 0);

export const response = async (res, data, session, isCommit) => {
  const { status, message, ...rest } = data;

  if (session?.commitTransaction && isCommit) await session.commitTransaction();
  if (session?.abortTransaction && !isCommit) await session.abortTransaction();

  res.status(status).json({ error: status >= 300, message, ...rest });
};
