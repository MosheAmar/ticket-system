

export default function Cards ({tickets}) {
    return (
        <div className="flex flex-wrap gap-2 mt-3 mb-6 justify-center">
            {tickets?.map((ticket, index)=>(
                <div className="flex  mb-1" key={index}>
                    <div className="flex flex-col justify-between shadow-lg p-3 mt-6 rounded w-[200px]">
                        <div className="font-bold">{ticket.title}</div>
                        <div className="text-sm mb-6 mt-3">{ticket.description}</div>
                        <div className="text-xs text-center">{ticket.date}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}