import IdeasApi from '../services/ideasApi';
// we want to render the cards
class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeasAxios();

    // create Set for the tags so we can handle Coloring
    // those should be pulled from data base basicly
    this._validTags = new Set();
    this._validTags.add('business');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListners() {
    // Evnet Delegation
    this._ideaListEl.addEventListener('click', (event) => {
      if (event.target.classList.contains('fa-times')) {
        // cancel propigation up
        event.stopImmediatePropagation();

        // get the idea
        // dataset.id beacuse my attibute = data-id (data-name-> dataset.name)
        const ideaId = event.target.parentElement.parentElement.dataset.id;
        const ideaCard = event.target.parentElement.parentElement;
        // console.log(ideaId);

        /*
        Delete 1 : from  the serve 
               2 : from the DOM 
        */
        this.deleteIdeaAxios(ideaId).then(() => {
          // we can add then here
          // this._ideas.filter((idea) => ideaId !== idea._id);
          // ideaCard.remove();
        });
      }
    });
  }

  async deleteIdeaAxios(ideaId) {
    try {
      // Delete From server
      const res = await IdeasApi.deleteIdea(ideaId);

      // Delete form the ideas list
      // it will give us all ideas but the one we deleted
      this._ideas.filter((idea) => ideaId !== idea._id);

      // Delete From the DOM "List"

      var element = document.querySelector('[data-id="' + ideaId + '"]');

      if (element) {
        // The element with the specified data-id value was found
        element.remove();
      } else {
        // Element with the specified data-id value was not found
        console.log('Element not found');
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getIdeasAxios() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      console.log(this._ideas);

      // we get the ideas render it
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  // add the idea localy , its already in the Server
  addIdeaToListUI(newIdea) {
    this._ideas.push(newIdea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    }
    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        // we add the idea id so we can handle the delete
        // when we add coustem attribuite it should be data attribuite
        return `
      <div class="card" data-id="${idea._id}">
      ${deleteBtn}
      <h3>
       ${idea.text}
      </h3>
      <p class="tag ${this.getTagClass(idea.tag)}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>`;
      })
      .join('');
    this.addEventListners();
  }
}

export default IdeaList;
