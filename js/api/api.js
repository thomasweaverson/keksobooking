const createDataHandler = () => {
  let data = [];

  const getData = async (onSuccess, onFail) => {
    try {
      const response = await fetch(
        'https://25.javascript.htmlacademy.pro/keksobooking/data'
      );

      if (!response.ok) {
        throw new Error('не удалось получить данные');
      }

      const offers = await response.json();
      data = offers; // сохраняем данные в переменную data
      onSuccess(offers);
    } catch (error) {
      onFail(error.message);
    }
  };

  const useData = () => data || []; // функция, которая возвращает данные

  return { getData, useData };
};

const sendFormData = async (onSuccess, onFail, body) => {
  const url = 'https://25.javascript.htmlacademy.pro/keksobooking';
  try {
    const response = await fetch(
      url,
      {
        method: 'POST',
        body,
      }
    );
    if (!response.ok) {
      throw new Error();
    }
    onSuccess();
  } catch (error) {
    onFail();
  }
};

export { createDataHandler, sendFormData };
