import { stripe } from "@/lib/stripe";
import { MainContainer, CardProduct } from '@/styles/pages/index';
import { GetServerSideProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

interface Product {
  id: string,
  name: string,
  imageUrl: string,
  price: number
}

interface TypeProduct {
  products: Product[]
}

export default function Home({ products }: TypeProduct) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.8
    }
  })

  return (
    <>
      <MainContainer ref={sliderRef} className="keen-slider">
        {products.map((product: Product) => {
          return (
            <CardProduct key={product.id} className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt=""/>
              <footer>
                <h2>{ product.name }</h2>
                <span>{ product.price }</span>
              </footer>
            </CardProduct>
          );
        })}
      </MainContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });
  
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    }
  });

  return {
    props: {
      products
    }
  }

};