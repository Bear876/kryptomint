document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.coincap.io/v2/assets?limit=10';

    
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    const renderCryptoCards = (cryptoData) => {
      
      const sortedCryptoData = cryptoData.sort((a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd));

      const cryptoContainer = document.getElementById('crypto-cards');

      sortedCryptoData.forEach((crypto) => {
        const card = document.createElement('div');
        card.classList.add('crypto-card');

        const name = document.createElement('h3');
        name.textContent = crypto.name;

        const symbol = document.createElement('p');
        symbol.textContent = `Symbol: ${crypto.symbol}`;

        const price = document.createElement('p');
        price.textContent = `Price: $${parseFloat(crypto.priceUsd).toFixed(2)}`;

        card.appendChild(name);
        card.appendChild(symbol);
        card.appendChild(price);

        cryptoContainer.appendChild(card);
      });
    };

    
    fetchData().then((cryptoData) => {
      renderCryptoCards(cryptoData);
    });
  });