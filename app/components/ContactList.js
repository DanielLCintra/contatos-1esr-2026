import ContactItem from "./ContactItem";
import EmptyState from "./ui/EmptyState";

const ContactList = ({ contacts, setContacts }) => {
    const handleRemove = (id) => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
    };

    return (<section className="bg-white shadow rounded">
        <div className="px-4 py-3 border-b">
            <h2 className="font-medium text-gray-900">
                Contatos ({contacts.length})
            </h2>
        </div>
        <ul className="divide-y">
            {contacts.length === 0 ? (
                <EmptyState icon="📭" message="Nenhum contato cadastrado ainda." />
            ) : (
                contacts.map((c) => (
                    <ContactItem key={c.id} contact={c} handleRemove={handleRemove} />
                ))
            )}
        </ul>
    </section>
    )
}

export default ContactList