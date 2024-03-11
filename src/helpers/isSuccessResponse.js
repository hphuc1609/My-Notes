/**
 * Check if the response is a successful one.
 *
 * @param {import("axios").AxiosResponse} response - the response object to be checked
 * @return {boolean} true if the response is successful, false otherwise
 */
const isSuccessResponse = (response) => {
  const { status, data } = response;
  if (status !== 200 && status !== 201) {
    return false;
  }

  if (!data) {
    return false;
  }

  return true;
};

export default isSuccessResponse;
