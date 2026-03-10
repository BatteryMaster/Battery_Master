import Link from "next/link";

type CategoryCardProps = {
  name: string;
  description: string;
};

export default function CategoryCard({
  name,
  description,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${name.toLowerCase()}`}
      className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <div className="mt-5 text-sm font-semibold text-blue-600">
        View Category →
      </div>
    </Link>
  );
}