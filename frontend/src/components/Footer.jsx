function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-6">
      <div className="container mx-auto px-4 py-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} ShopSmart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
