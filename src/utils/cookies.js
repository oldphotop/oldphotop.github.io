// Функция для установки куки
export const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};

// Функция для получения куки по имени
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split('; '); // Разделяем все куки на массив
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length); // Удаляем пробелы в начале
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length); // Если найдено, возвращаем значение
    }
    return null; // Если куки не найдено
};
