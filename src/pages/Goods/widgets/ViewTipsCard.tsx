import React from 'react'

interface IViewTipsCardProps {
    title: string
    items: Array<{
        title: string
        content: string
    }>
}

const ViewTipsCard: React.FC<IViewTipsCardProps> = ({ title, items }) => {
    return (
        <div className="bg-white shadow-lg p-4 rounded-lg">
            <p className="text-md font-semibold">{title}</p>
            <ul className="mt-5 space-y-5">
                {items.map((item) => (
                    <li key={item.title} className="text-xs">
                        <p className="mb-2 font-semibold">{item.title}</p>
                        <p className="text-gray-400">{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export { ViewTipsCard }
