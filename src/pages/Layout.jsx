import Header from "../components/organisms/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex w-full flex-1 justify-center px-4 py-8 sm:px-6 sm:py-10">
        <div className="h-fit w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
