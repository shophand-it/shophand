import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

export default function CategoryGrid() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-automotive-black-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-automotive-black-700 rounded-xl p-6 border border-gold-600/20 animate-pulse">
                <div className="w-12 h-12 bg-gold-600 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-automotive-black-800">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <div 
              key={category.id}
              className="bg-automotive-black-700 rounded-xl p-6 border border-gold-600/20 hover:border-gold-500 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className={`${category.icon} text-automotive-black-900 text-xl`}></i>
              </div>
              <h3 className="font-semibold text-white mb-2">{category.name}</h3>
              <p className="text-gray-400 text-sm">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
