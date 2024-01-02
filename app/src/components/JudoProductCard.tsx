import JudoTypography from './JudoTypography'

export interface Product {
    id: string
    currency: string
    price: number
    description: string
    title: string
}

interface Props {
    product: Product
}

function JudoProductCard(props: Props) {
    const { product } = props
    return (
        <li key={product.title} className="flex justify-between gap-x-6 py-3">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex flex-col items-start">
                    <JudoTypography className="font-semibold">{product.title}</JudoTypography>
                    <JudoTypography variant="decoration" className="text-wrap sm:text-clip text-xs">
                        {product.description}
                    </JudoTypography>
                </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
                <JudoTypography className="font-bold">{product.currency}</JudoTypography>
                <JudoTypography>{product.price}</JudoTypography>
            </div>
        </li>
    )
}

export default JudoProductCard
