export default class Api {
  constructor(options) {
    // constructor body
  }

  async getInitialCards() {
    const res = await fetch(
      "https://around-api.en.tripleten-services.com/v1/cards",
      {
        headers: {
          authorization: "00971118-9fba-418f-9a4a-7fa64165e057",
        },
      }
    );
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  // other methods for working with the API
}
getInitialCards();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "00971118-9fba-418f-9a4a-7fa64165e057",
    "Content-Type": "application/json",
  },
});

/*
user	
name	"Placeholder name"
about	"Placeholder description"
avatar	"https://practicum-content.s3.amazonaws.com/resources/avatar_placeholder_1704989734.svg"
_id	"a988e0a55355bcf24972e865"
token	"00971118-9fba-418f-9a4a-7fa64165e057"
*/
