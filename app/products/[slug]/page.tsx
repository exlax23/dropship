import { notFound } from 'next/navigation'
import { products, getProduct } from '@/lib/products'
import ProductDetail from './ProductDetail'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage(props: PageProps<'/products/[slug]'>) {
  const { slug } = await props.params
  const product = getProduct(slug)

  if (!product) notFound()

  const related = products.filter((p) => product.related.includes(p.slug))

  return <ProductDetail product={product} related={related} />
}
