"use client";
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import contactsApi from '../services/contactsApi';

// 1. Criar o Context
const ContactsContext = createContext();

// 2. Hook customizado para usar o Context
export const useContactsContext = () => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error('useContactsContext deve ser usado dentro de ContactsProvider');
    }
    return context;
};

export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadContacts = useCallback(async () => {
        try {
            const response = await contactsApi.get('/contatos');
            setContacts(response.data);
            setLoading(false);
        } catch (error) {
            setError('Erro ao carregar contatos', error);
            setLoading(false);
        }
    }, []);

    const addContact = useCallback(async (newContact) => {
        try {
            const response = await contactsApi.post('/contatos', newContact);
            setContacts(prev => [...prev, response.data]);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError('Erro ao adicionar contato', error);
        }
    }, []);

    const removeContact = useCallback(async (id) => {
        try {
            // Tentar excluir via API primeiro
            await contactsApi.delete(`/contatos/${id}`);
            setContacts((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            setError('Erro ao remover contato', error);
        }
    }, []);

    // Buscar contato específico por ID
    const getContact = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await contactsApi.get(`/contatos/${id}`);
            setContact(response.data);
            setLoading(false);
        } catch (error) {
            setError('Erro ao buscar contato:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadContacts()
    }, []);

    const value = {
        contacts,
        setContacts,
        contact,
        setContact,
        loading,
        setLoading,
        error,
        setError,
        loadContacts,
        addContact,
        removeContact,
        getContact
    }

    return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    );
}