import { gql, useQuery } from '@apollo/client'
import JudoProductCard, { Product } from '../components/JudoProductCard'
import JudoHeader from '../components/JudoHeader'
import JudoCard from '../components/JudoCard'

function ProductsPage() {
    const { loading, error, data } = useQuery(gql`
        query ProductsQuery {
            products {
                id
                currency
                price
                description
                title
            }
        }
    `)

    if (loading) {
        return <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black" />
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="w-full margin">
            <JudoHeader />
            <JudoCard className="m-auto py-10">
                <ul role="list" className="divide-y divide-gray-100">
                    {data.products.map((product: Product) => (
                        <JudoProductCard key={product.id} product={product} />
                    ))}
                </ul>
            </JudoCard>
        </div>
    )
}

export default ProductsPage
