import Categories from "./components/Categories";
import PropertyList from "./components/properties/PropertyList";


export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <div className="flex items-center justify-center">
        <Categories>

        </Categories>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 " >
        <PropertyList></PropertyList>
      </div>

    </main>
  );
}
