export const getCSRFToken = async () => {
  const res = await fetch(
    `https://ecommerceprojectserver.herokuapp.com/api/getCSRFToken`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Origin: `http://${window.location.host}`,
      },
    }
  );
  const token = res.json();
  return await token;
};
