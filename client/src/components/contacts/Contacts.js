import React, {Fragment, useContext} from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/Contact/ContactContext';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts} = contactContext;
    return (
        <Fragment>
            {contacts.map(contact => 
            <ContactItem key = {contact.id} contact={contact}></ContactItem>)}
        </Fragment>
    )
}

export default Contacts