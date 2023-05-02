import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import css from './ContactForm.module.css';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';

const initialValues = {
  name: '',
  number: '',
};

let userSchema = object().shape({
  name: string().min(2).required(),
  number: string()
    .min(10, '10 number not with space: 067 954 310')
    .matches(
      /^((\(\d{3}\)?)|(\d{3}))?\d{3}\d{4}$/,
      '10 number not with space: 067 954 310'
    )
    .required(),
});

export default function ContactForm() {
  const contactsRedux = useSelector(state => state.contacts);

  const dispatch = useDispatch();

  const handleSubmit = ({ name, number }, action) => {
    if (contactsRedux.find(contact => contact.name === name) !== undefined) {
      Notiflix.Notify.failure(`${name} already in your contact book`);
      return;
    }
    dispatch(addContacts(name, number));
    Notiflix.Notify.success(`You delete ${name} to phonebook`);
    action.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      <Form autoComplete="off">
        <label>
          <p>Name</p>
          <Field type="text" name="name" />
          <ErrorMessage component="p" className={css.nameError} name="name" />
        </label>

        <label>
          <p>Number</p>
          <Field type="tel" name="number" />
          <ErrorMessage
            component="p"
            className={css.phoneError}
            name="number"
          />
        </label>
        <br></br>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
