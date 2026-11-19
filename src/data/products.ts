// Product images - 212D
import img212dFrente from "@/assets/products/212d-frente.jpg";
import img212dLateral1 from "@/assets/products/212d-lateral1.jpg";
import img212dLateral2 from "@/assets/products/212d-lateral2.jpg";
import img212dTraseira from "@/assets/products/212d-traseira.jpg";

// Product images - 210D
import img210dFrente from "@/assets/products/210d-frente.jpg";
import img210dFrente2 from "@/assets/products/210d-frente2.jpg";
import img210dLateral1 from "@/assets/products/210d-lateral1.jpg";
import img210dLateral2 from "@/assets/products/210d-lateral2.jpg";
import img210dLateral3 from "@/assets/products/210d-lateral3.jpg";
import img210dTraseira from "@/assets/products/210d-traseira.jpg";

// Product images - Easy 2x10D
import imgEasy2x10dFrente from "@/assets/products/easy-2x10d-frente.jpg";
import imgEasy2x10dLateral1 from "@/assets/products/easy-2x10d-lateral1.jpg";
import imgEasy2x10dLateral2 from "@/assets/products/easy-2x10d-lateral2.jpg";
import imgEasy2x10dCima from "@/assets/products/easy-2x10d-cima.jpg";
import imgEasy2x10dTraseira from "@/assets/products/easy-2x10d-traseira.jpg";

// Product images - Easy 1x10D
import imgEasy1x10dFrente from "@/assets/products/easy-1x10d-frente.jpg";
import imgEasy1x10dLateral1 from "@/assets/products/easy-1x10d-lateral1.jpg";
import imgEasy1x10dLateral2 from "@/assets/products/easy-1x10d-lateral2.jpg";
import imgEasy1x10dCima from "@/assets/products/easy-1x10d-cima.jpg";
import imgEasy1x10dTraseira from "@/assets/products/easy-1x10d-traseira.jpg";

// Product images - Easy 1x12D
import imgEasy1x12dFrente from "@/assets/products/easy-1x12d-frente.jpg";
import imgEasy1x12dLateral1 from "@/assets/products/easy-1x12d-lateral1.jpg";
import imgEasy1x12dLateral2 from "@/assets/products/easy-1x12d-lateral2.jpg";
import imgEasy1x12dCima from "@/assets/products/easy-1x12d-cima.jpg";
import imgEasy1x12dTraseira from "@/assets/products/easy-1x12d-traseira.jpg";

// Product images - 410DP
import img410dpFrente from "@/assets/products/410dp-frente2.jpg";
import img410dpLateral from "@/assets/products/410dp-lateral.jpg";

// Product images - 112D
import img112dFrente from "@/assets/products/112d-frente2.jpg";
import img112dLateral1 from "@/assets/products/112d-lateral1.jpg";
import img112dLateral2 from "@/assets/products/112d-lateral2.jpg";
import img112dCima from "@/assets/products/112d-cima.jpg";
import img112dTraseira from "@/assets/products/112d-traseira.jpg";

// Product images - 112ND
import img112ndFrente from "@/assets/products/112nd-frente.png";
import img112ndTraseira from "@/assets/products/112nd-traseira.png";
import img112ndLateral from "@/assets/products/112nd-lateral.png";

// Product images - 115D
import img115dFrente from "@/assets/products/115d-frente.jpg";

// Product images - 115ND
import img115ndFrente from "@/assets/products/115nd-frente.jpg";
import img115ndLateral from "@/assets/products/115nd-lateral.jpg";

// Product images - 410DP additional
import img410dpFrente3 from "@/assets/products/410dp-frente3.jpg";

import imgEasy1x12ndFrente from "@/assets/products/easy-1x12nd-frente.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string;
  price: number;
  image?: string;
  gallery?: string[];
  line: "premium" | "easy";
}

const product212dGallery = [img212dFrente, img212dLateral1, img212dLateral2, img212dTraseira];
const product210dGallery = [img210dFrente2, img210dLateral3];
const product210dpGallery = [img210dFrente, img210dLateral1, img210dLateral2, img210dTraseira];
const productEasy2x10dGallery = [imgEasy2x10dFrente, imgEasy2x10dLateral1, imgEasy2x10dLateral2, imgEasy2x10dCima, imgEasy2x10dTraseira];
const productEasy1x10dGallery = [imgEasy1x10dFrente, imgEasy1x10dLateral1, imgEasy1x10dLateral2, imgEasy1x10dCima, imgEasy1x10dTraseira];
const productEasy1x12dGallery = [imgEasy1x12dFrente, imgEasy1x12dLateral1, imgEasy1x12dLateral2, imgEasy1x12dCima, imgEasy1x12dTraseira];
const product410dpGallery = [img410dpFrente3, img410dpFrente, img410dpLateral];
const product112dGallery = [img112dFrente, img112dLateral1, img112dLateral2, img112dCima, img112dTraseira];
const product112ndGallery = [img112ndFrente, img112ndLateral, img112ndTraseira];
const productEasy1x12ndGallery = [imgEasy1x12ndFrente];
const product115dGallery = [img115dFrente];
const product115ndGallery = [img115ndFrente, img115ndLateral];

export const premiumProducts: Product[] = [
  {
    id: "210d",
    name: "Wbass 210D",
    category: "Versátil",
    description: "2 falantes Italianos em neodímio de 10\" + driver com ajuste de volume 3 posições",
    specs: "400W RMS | 8 ohms",
    price: 5882.18,
    image: img210dFrente2,
    gallery: product210dGallery,
    line: "premium",
  },
  {
    id: "210dp",
    name: "Wbass 210DP",
    category: "Versátil Pro",
    description: "2 falantes Italianos em neodímio de 10\" + driver com ajuste de volume 3 posições",
    specs: "500W RMS | 4 ohms",
    price: 6070.68,
    image: img210dFrente,
    gallery: product210dpGallery,
    line: "premium",
  },
  {
    id: "212d",
    name: "Wbass 212D",
    category: "Versátil Potente",
    description: "2 falantes Italianos em neodímio de 12\" + driver com ajuste de volume 3 posições",
    specs: "700W RMS | 4 ohms",
    price: 6751.21,
    image: img212dFrente,
    gallery: product212dGallery,
    line: "premium",
  },
  {
    id: "410dp",
    name: "Wbass 410DP",
    category: "Profissional",
    description: "4 falantes Italianos em neodímio de 10\" + driver com ajuste de volume 3 posições",
    specs: "800W RMS | 4 ohms",
    price: 7457.33,
    image: img410dpFrente,
    gallery: product410dpGallery,
    line: "premium",
  },
  {
    id: "112d",
    name: "Wbass 112D",
    category: "Compacto",
    description: "1 falante Italiano em neodímio de 12\" + driver com ajuste de volume 3 posições",
    specs: "350W RMS | 4 ou 8 ohms",
    price: 5792.09,
    image: img112dFrente,
    gallery: product112dGallery,
    line: "premium",
  },
  {
    id: "112nd",
    name: "Wbass 112ND",
    category: "Compacto",
    description: "1 falante Italiano em neodímio de 12\", não possui driver",
    specs: "350W RMS | 4 ou 8 ohms",
    price: 4546.08,
    image: img112ndFrente,
    gallery: product112ndGallery,
    line: "premium",
  },
  {
    id: "115d",
    name: "Wbass 115D",
    category: "Graves Profundos",
    description: "1 falante Italiano em neodímio de 15\" + driver com ajuste de volume 3 posições",
    specs: "400W RMS | 8 ohms",
    price: 6048.50,
    image: img115dFrente,
    gallery: product115dGallery,
    line: "premium",
  },
  {
    id: "115nd",
    name: "Wbass 115ND",
    category: "Graves Profundos",
    description: "1 falante Italiano em neodímio de 15\", não possui driver",
    specs: "400W RMS | 8 ohms",
    price: 4820.51,
    image: img115ndFrente,
    gallery: product115ndGallery,
    line: "premium",
  },
];

export const easyProducts: Product[] = [
  {
    id: "easy-1x10d",
    name: "Wbass Easy 1x10D",
    category: "Compacto",
    description: "1 falante 10\" em ferrite nacional + driver com ajuste de volume 3 posições",
    specs: "300W RMS | 4 ou 8 ohms",
    price: 3147.90,
    image: imgEasy1x10dFrente,
    gallery: productEasy1x10dGallery,
    line: "easy",
  },
  {
    id: "easy-2x10d",
    name: "Wbass Easy 2x10D",
    category: "Versátil",
    description: "2 falantes 10\" em ferrite nacional + driver com ajuste de volume 3 posições",
    specs: "500W RMS | 4 ou 8 ohms",
    price: 3778.95,
    image: imgEasy2x10dFrente,
    gallery: productEasy2x10dGallery,
    line: "easy",
  },
  {
    id: "easy-1x12d",
    name: "Wbass Easy 1x12D",
    category: "Compacto",
    description: "1 falante 12\" em ferrite nacional + driver com ajuste de volume 3 posições",
    specs: "400W RMS | 4 ou 8 ohms",
    price: 3568.95,
    image: imgEasy1x12dFrente,
    gallery: productEasy1x12dGallery,
    line: "easy",
  },
  {
    id: "easy-1x12nd",
    name: "Wbass Easy 1x12ND",
    category: "Compacto",
    description: "1 falante 12\" em ferrite nacional, não possui driver",
    specs: "400W RMS | 4 ou 8 ohms",
    price: 2833.95,
    image: imgEasy1x12ndFrente,
    gallery: productEasy1x12ndGallery,
    line: "easy",
  },
];

export const allProducts: Product[] = [...premiumProducts, ...easyProducts];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}
