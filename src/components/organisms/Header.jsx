import SystemBrand from "../atoms/SystemBrand";
import StudentIdentity from "../atoms/StudentIdentity";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="h-1 w-full bg-green-800">
        <div className="h-full w-16 bg-red-600" />
      </div>

      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <SystemBrand />
        <StudentIdentity />
      </div>
    </header>
  );
}
