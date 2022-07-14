import { userRequest } from '../requestMethods';

export const checkMmTk = async (mmTk: string) => {
  const res = await userRequest.post('/checkCSRFToken', {
    mmTk,
  });
  const csrfCheck = res.data;

  return csrfCheck;
};

export const isMnTk = (
  mmTk: string,
  setCb: React.Dispatch<React.SetStateAction<boolean>>
) => {
  checkMmTk(mmTk).then((data) => setCb(data));
};
