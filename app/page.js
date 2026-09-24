"use client";
import { useEffect, useMemo, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import FilterInput from "./components/FilterInput";
import Statistics from "./components/Statistics";

const HomePage = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  const filteredContacts = useMemo(() => {
    console.log('Filtrando contatos...');

    if (!filter.trim()) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.nome.toLowerCase().includes(filter.toLowerCase()) ||
      contact.email.toLowerCase().includes(filter.toLowerCase()) ||
      contact.telefone.includes(filter)
    );
  }, [contacts, filter]);

  const handleSubmit = (newContact) => {
    setContacts(prev => [...prev, newContact]);
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem('contatos');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('contatos', JSON.stringify(contacts));
    }
  }, [contacts, isLoaded]);

  const stats = useMemo(() => {
    console.log('Calculando estatísticas...');

    const total = contacts.length;
    const comEmail = contacts.filter(c => c.email).length;
    const comTelefone = contacts.filter(c => c.telefone).length;

    return {
      total,
      comEmail,
      comTelefone,
      semEmail: total - comEmail,
      semTelefone: total - comTelefone
    };
  }, [contacts]);


  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Cadastro de Contatos
          </h1>

          <FilterInput value={filter} onChange={setFilter} />
        </header>

        {/* ===== FORMULÁRIO ===== */}
        <ContactForm setContacts={setContacts} />

        <Statistics stats={stats} />

        {/* ===== LISTA DE CONTATOS ===== */}
        <ContactList contacts={filteredContacts} setContacts={setContacts} />
      </div>
    </div>
  );
};

export default HomePage;