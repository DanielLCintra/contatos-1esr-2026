const EmptyState = ({ message = "Nenhum item encontrado", icon }) => {
    return (<div className="py-8 text-center text-gray-400">
        {icon && <div className="text-4xl mb-2">{icon}</div>}
        <p>{message}</p>
    </div>)
}

export default EmptyState