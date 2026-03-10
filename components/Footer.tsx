import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
              E
            </div>
            <div>
              <h4 className="text-xl font-black text-gray-900">
                Electrofy<span className="text-blue-600">.pk</span>
              </h4>
              <p className="text-sm text-gray-500">Smart electronics shopping</p>
            </div>
          </div>

          <p className="mt-4 max-w-sm text-gray-600">
            Professional electronics ecommerce website for modules, ICs,
            transistors, resistors, and tools across Pakistan.
          </p>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-900">Quick Links</h5>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-blue-600">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-blue-600">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-bold text-gray-900">Policies</h5>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li>
              <Link href="/about" className="hover:text-blue-600">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-blue-600">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:text-blue-600">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/return-refund-policy" className="hover:text-blue-600">
                Return / Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © 2025 Electrofy.pk. All rights reserved.
      </div>
    </footer>
  );
}