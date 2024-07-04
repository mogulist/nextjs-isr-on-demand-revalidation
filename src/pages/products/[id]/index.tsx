// Generated with ChatGPT 4o
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { faker } from "@faker-js/faker";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  extendedDescription: string[];
  category: string;
  image: string;
  additionalImages: string[];
};

type ProductDetailProps = {
  product: Product;
};

const ProductDetail: NextPage<ProductDetailProps> = ({ product }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed initially until the page is generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="relative w-72 h-72 mb-6">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="rounded"
        />
      </div>
      <p className="mb-4">{product.description}</p>
      <p className="font-bold text-xl mb-4">${product.price}</p>
      <div className="mb-6">
        {product.extendedDescription.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {product.additionalImages?.map((img, index) => (
          <div key={index} className="relative w-24 h-24">
            <Image
              src={img}
              alt={`${product.title} image ${index + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);
  const product = await res.json();

  // Generate additional images using the new faker.image.url
  const additionalImages = Array.from({ length: 5 }).map(
    () => faker.image.url() // Use faker.image.imageUrl() for generating random image URLs
  );

  // Generate a longer extended description with at least three paragraphs
  const extendedDescription = Array.from({ length: 3 }).map(() =>
    faker.lorem.paragraph()
  );

  const extendedProduct: Product = {
    ...product,
    extendedDescription,
    additionalImages,
  };

  return {
    props: {
      product: extendedProduct,
    },
  };
};

export default ProductDetail;
