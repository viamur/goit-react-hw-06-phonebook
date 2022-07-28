import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeInput = e => {
    const input = e.target;
    this.setState({ [input.name]: input.value });
  };

  handleFormCompilation = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { handleSubmitForm, contacts } = this.props;
    const id = nanoid();

    const obj = {
      id,
      name,
      number,
    };

    const check = contacts.find(el => el.name === name);
    if (!check) {
      handleSubmitForm(obj);
      this.setState({ name: '', number: '' });
    } else {
      Report.failure('Error', name + 'is already in contacts', 'Okay');
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleFormCompilation}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChangeInput}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChangeInput}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  handleSubmitForm: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
