document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelector('.squares');
    for (let i = 1; i < 365; i++) {
        const level = Math.floor(Math.random() * 5); // 0 to 4
        squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
    }
});
