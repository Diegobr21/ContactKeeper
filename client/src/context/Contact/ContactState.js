import React, {useReducer} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from "uuid";
import ContactContext from './ContactContext'
import ContactReducer from './ContactReducer'
import {
    ADD_CONTACT,
    CLEAR_CONTACTS,
    GET_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        //contact.id = uuidv4();

        try {
            const res = await axios.post('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
        
    }

    // Add Contact
    const addContact = async contact => {
        //contact.id = uuidv4();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
        
    }
    

    // Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }
    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT});
    }

    // Update contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    }

    // Filter contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER});
    }


    return (
        <ContactContext.Provider
            value ={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}>
            {props.children}
        </ContactContext.Provider>
    )

}

export default ContactState;
