"use client";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import FilterInput from "./components/FilterInput";
import Statistics from "./components/Statistics";
import { useContactsContext } from "./contexts/ContactsContext";
import useFilter from "./hooks/useFilter";
import useStatistics from "./hooks/useStatistics";

const HomePage = () => {
  const contactsData = useContactsContext()
  const filterData = useFilter(contactsData.contacts)
  const stats = useStatistics(contactsData.contacts)

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Cadastro de Contatos
          </h1>

          <FilterInput value={filterData.filter} onChange={filterData.handleFilterChange} />
        </header>

        {/* ===== FORMULÁRIO ===== */}
        <ContactForm setContacts={contactsData.setContacts} />

        <Statistics stats={stats} />

        {/* ===== LISTA DE CONTATOS ===== */}
        <ContactList contacts={filterData.filteredContacts} setContacts={contactsData.setContacts} />
      </div>
    </div>
  );
};

export default HomePage;