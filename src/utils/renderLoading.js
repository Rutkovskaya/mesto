//Улучшатор UX всех форм
export function renderLoading(popupSelector, loading) {
    const popup = document.querySelector(popupSelector);
    const submitButton = popup.querySelector('.popup__submit-btn');
    if (loading) {
        submitButton.textContent = 'Сохранение...'
    }
    else {
        submitButton.textContent = 'Сохранить'
    }
}
