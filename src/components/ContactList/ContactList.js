import { useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { deleteContact } from 'redux/contactsSlice';
import { useDispatch } from 'react-redux';

export default function ContactList() {
  const contactsRedux = useSelector(state => state.contacts);

  const filterRedux = useSelector(state => state.filters);

  const dispatch = useDispatch();

  const oNdeleteContact = e => {
    dispatch(deleteContact(e.target.id));
  };

  const visibleContacts = filterRedux
    ? contactsRedux.filter(contact => contact.name.includes(filterRedux))
    : contactsRedux;

  return (
    <>
      {visibleContacts.length === 0 ? (
        <div>Empty</div>
      ) : (
        <ul>
          {visibleContacts.map(({ name, id, number }) => (
            <li key={id}>
              <span className={css.name}> {name}:</span>
              <span className={css.number}>{number}</span>
              <button type="button" id={id} onClick={oNdeleteContact}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
