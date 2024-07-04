// Generated with ChatGPT 4o

import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductListProps = {
  products: Product[];
};

const ProductList: NextPage<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h1>Product List</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Link href={`/products/${product.id}`} legacyBehavior>
              <a
                style={{
                  display: "flex",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    marginRight: "20px",
                    position: "relative",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <h2 style={{ margin: 0 }}>{product.title}</h2>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    ${product.price}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return {
    props: {
      products,
    },
  };
};

export default ProductList;
