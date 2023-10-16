class Modal {
  // class Propirites best practice to add them to the Ctr
  constructor() {
    // Show the modal Component
    this._modal = document.querySelector('#modal');
    this._btn = document.querySelector('#modal-btn');

    this.addEventListners();
  }

  addEventListners() {
    // Evvent Listners // dont forget to bind
    // otherwise this will  pertain to the element that it was called on , the btn
    this._btn.addEventListener('click', this.openModal.bind(this));
    window.addEventListener('click', this.outsideClick.bind(this));

    // Dispatching
    document.addEventListener('closeModalDispatch', () => this.closeModal());
  }

  openModal(e) {
    this._modal.style.display = 'block';
  }

  //  clicking outside the modal box , in the modal element that tale the whole scree
  closeModal() {
    this._modal.style.display = 'none';
  }

  outsideClick(event) {
    if (event.target === this._modal) {
      this.closeModal();
    }
  }
}
export default Modal;
