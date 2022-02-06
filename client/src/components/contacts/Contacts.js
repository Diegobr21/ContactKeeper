import React, {Fragment, useContext, useEffect} from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactItem from './ContactItem';
import ContactContext from '../../context/Contact/ContactContext';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //es-lint-disable-next-line
    }, []);
    if(contacts.length === 0){
        return <h4>Add a contact to see it right here</h4>
    }
    return (
        <Fragment>
            <TransitionGroup>
            {filtered !== null ? filtered.map(contact => 
            (<CSSTransition key = {contact._id} timeout={500} classNames='item'>
                <ContactItem  contact={contact}></ContactItem>
                </CSSTransition>)) : contacts.map(contact => 
                <CSSTransition key = {contact._id} timeout={500} classNames='item'>
                    <ContactItem  contact={contact}></ContactItem>
                </CSSTransition>)}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts