export const fetchUrl = (url) => fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Unable to make Ajax call');
    }
    return response.json();
  })
  .catch(error => {
    console.error(`Error in client call: ${error}`);
    return false;
  });
