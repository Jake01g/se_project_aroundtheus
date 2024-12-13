class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "00971118-9fba-418f-9a4a-7fa64165e057",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  // other methods for working with the API
}

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
