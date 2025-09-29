import getAllProducts from "@/apis/allProducts";
import HomeCard from "./_components/HomeCard/HomeCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import { ProductRoot } from "@/types/product.type";

export default async function Home() {
  const data: ProductRoot[] = await getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <section className="px-4 md:px-0 py-12 w-full md:w-[80%] mx-auto">
        <MainSlider />

        <div className="my-12">
          <CategorySlider />
        </div>

        {/* Featured Products Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of the freshest and highest quality products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.map((product: ProductRoot, idx: number) => (
              <HomeCard key={idx} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
