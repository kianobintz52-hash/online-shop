import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Über uns</h3>
            <p>Dein Online Shop für qualitativ hochwertige Produkte.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul>
              <li><a href="#">Kontakt</a></li>
              <li><a href="#">Impressum</a></li>
              <li><a href="#">Datenschutz</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <input type="email" placeholder="E-Mail" className="p-2 rounded w-full" />
            <button className="bg-blue-600 w-full mt-2 p-2 rounded">Abonnieren</button>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-center">&copy; 2024 Online Shop. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};

export default Footer;
