// bring the api service
import IdeaApi from '../services/ideasApi';
import IdeaList from './IdeaList';
class IdeaForm {
  // the input componnent data
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    // instaniate the idea list
    this._ideaList = new IdeaList();
  }

  addEventListners() {
    // Evvent Listners //
    // dont forget to bind
    // otherwise this will  pertain to the element that it was called on
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" 
            value="${
              localStorage.getItem('username')
                ? localStorage.getItem('username')
                : ''
            }"/>
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>
        `;

    this._form = document.querySelector('#idea-form'); // rendered via render() call
    this.addEventListners();
  }

  // idea to submit to my API
  async handleSubmit(event) {
    event.preventDefault();

    // handle validation
    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert(
        'Enter data You Stupid Duck , why to submit an empty from to the server and make the validation on the server , do you know how many hops the package got to go through ??? '
      );
      return;
    }

    //save User to local Storage
    localStorage.setItem('username', this._form.elements.username.value);

    // idea to submit to my API
    // the name value in the from
    //  this._form.elements.<name>.value
    const idea = {
      text: this._form.elements.text.value,
      username: this._form.username.value,
      tag: this._form.elements.tag.value,
    };

    // Add idea to server
    const newIdea = await IdeaApi.createIdea(idea);
    // we need to render after the Submition

    console.log('New IDea:', newIdea);
    // ADd idea to List, we can check the status here for Validation
    this._ideaList.addIdeaToListUI(newIdea.data.data);

    // clear the filds
    this._form.elements.text.value = '';
    this._form.elements.username.value = '';
    this._form.elements.tag.value = '';

    this.render(); // render the

    /*  
    When we submit, I want to clear the form fields, but I also want to close the modal.
    And that can be a little confusing because we have our they're separate, right?
    We have our form component, which is completely separate from the modal.
    So what we can do to to to make this happen is dispatch a custom event from our form and then basically
    listen for that event in the modal and then close the modal when we submit
    */

    // Dispatch Coustem Event (listen to the event in the Modal Componnet )
    document.dispatchEvent(new Event('closeModalDispatch'));
  }
}

export default IdeaForm;
