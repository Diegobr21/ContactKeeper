import React, {useReducer} from 'react';
import {v4 as uuidv4} from "uuid";
import ContactContext from './ContactContext'
import ContactReducer from './ContactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id:1,
                name: 'John Doe',
                email: 'jjj@gmail.com',
                phone: '8999',
                type: 'personal'
            },
            {
                id:2,
                name: 'Johny Dae',
                email: 'john@gmail.com',
                phone: '555-555',
                type: 'personal'
            },
            {
                id:3,
                name: 'Sara Doe',
                email: 'sara@gmail.com',
                phone: '528462458',
                type: 'professional'
            }
        ]
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }
    

    // Delete Contact

    // Set current contact

    // Clear current contact

    // Update contact

    // Filter contacts

    // Clear filter


    return (
        <ContactContext.Provider
            value ={{
                contacts: state.contacts,
                addContact
            }}>
            {props.children}
        </ContactContext.Provider>
    )

}

export default ContactState;
