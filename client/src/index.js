import Modal from './component/Modal';
import Cred from './cred';
// import '@fortawesome/fontawesome-free/css/all.css';
import './css/style.css';
import IdeaForm from './component/IdeaForm';
import IdeaList from './component/IdeaList';

// instaniate Modal compnent (this is how we invoke the functinolaity )
const modal = new Modal(); // the same is new Modal();

// instaniate Idea From compnent
const ideaForm = new IdeaForm();
ideaForm.render();

// the cardList
const ideaList = new IdeaList();
// ideaList.render();

// init Cred class
const cred = new Cred();
