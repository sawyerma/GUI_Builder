import { useState } from "react";
import { X } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [activeSection, setActiveSection] = useState("Symbol");

  if (!isOpen) return null;

  const sidebarItems = [
    { id: "Symbol", name: "Symbol", icon: "🔧" },
    { id: "StatusZeile", name: "Status Zeile", icon: "📊" },
    { id: "SkalaLinien", name: "Skala und Linien", icon: "📏" },
    { id: "Canvas", name: "Canvas", icon: "🎨" },
    { id: "Trading", name: "Trading", icon: "💹" },
    { id: "Alarme", name: "Alarme", icon: "⏰" },
    { id: "Ereignisse", name: "Ereignisse", icon: "📅" },
  ];

  const renderSymbolSection = () => (
    <div className="flex-1 p-6">
      <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-4 tracking-wider">
        SYMBOL
      </h3>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="logo"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="logo" className="text-white text-sm">
            Logo
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="titel"
              defaultChecked
              className="w-4 h-4 rounded border-gray-600"
            />
            <label htmlFor="titel" className="text-white text-sm">
              Titel
            </label>
          </div>
          <select className="bg-gray-700 text-white text-sm px-3 py-1 rounded border border-gray-600 min-w-[120px]">
            <option>Beschreibung</option>
            <option>Symbol</option>
            <option>Vollständig</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="chartwerte"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="chartwerte" className="text-white text-sm">
            Chartwerte
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="balken"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="balken" className="text-white text-sm">
            Balken Änderungswerte
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="volumen"
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="volumen" className="text-white text-sm">
            Volumen
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="werte"
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="werte" className="text-white text-sm">
            Werte von Veränderungen am letzten Handelstag
          </label>
        </div>
      </div>

      <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-4 mt-8 tracking-wider">
        INDIKATOREN
      </h3>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="ind-titel"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="ind-titel" className="text-white text-sm">
            Titel
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="eingaben"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="eingaben" className="text-white text-sm">
            Eingaben
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="werte-ind"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="werte-ind" className="text-white text-sm">
            Werte
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="hintergrund"
              defaultChecked
              className="w-4 h-4 rounded border-gray-600"
            />
            <label htmlFor="hintergrund" className="text-white text-sm">
              Hintergrund
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              className="w-32 h-2 bg-blue-600 rounded-lg appearance-none slider"
              defaultValue="80"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStatusZeileSection = () => (
    <div className="flex-1 p-6">
      <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-4 tracking-wider">
        KERZEN
      </h3>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="balken-farben"
            className="w-4 h-4 rounded border-gray-600"
          />
          <label htmlFor="balken-farben" className="text-white text-sm">
            Balken gemäß des vorherigen Schlusskurs färben
          </label>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="korper"
                defaultChecked
                className="w-4 h-4 rounded border-gray-600"
              />
              <label htmlFor="korper" className="text-white text-sm">
                Körper
              </label>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded border border-gray-600 cursor-pointer"></div>
              <div className="w-8 h-8 bg-red-500 rounded border border-gray-600 cursor-pointer"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="rahmen"
                defaultChecked
                className="w-4 h-4 rounded border-gray-600"
              />
              <label htmlFor="rahmen" className="text-white text-sm">
                Rahmen
              </label>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded border border-gray-600 cursor-pointer"></div>
              <div className="w-8 h-8 bg-red-500 rounded border border-gray-600 cursor-pointer"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="docht"
                defaultChecked
                className="w-4 h-4 rounded border-gray-600"
              />
              <label htmlFor="docht" className="text-white text-sm">
                Docht
              </label>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded border border-gray-600 cursor-pointer"></div>
              <div className="w-8 h-8 bg-red-500 rounded border border-gray-600 cursor-pointer"></div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-4 mt-8 tracking-wider">
        MODIFIZIERUNG DER DATEN
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-white text-sm">Sitzung</label>
          <select className="bg-gray-700 text-white text-sm px-3 py-1 rounded border border-gray-600 min-w-[140px]">
            <option>Reguläre Handelszeiten</option>
            <option>Erweiterte Handelszeiten</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-white text-sm">Präzision</label>
          <select className="bg-gray-700 text-white text-sm px-3 py-1 rounded border border-gray-600 min-w-[100px]">
            <option>Standard</option>
            <option>Hoch</option>
            <option>Maximum</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-white text-sm">Zeitzone</label>
          <select className="bg-gray-700 text-white text-sm px-3 py-1 rounded border border-gray-600 min-w-[120px]">
            <option>(UTC+2) Berlin</option>
            <option>(UTC+0) London</option>
            <option>(UTC-5) New York</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderDefaultSection = () => (
    <div className="flex-1 p-6">
      <h3 className="text-lg font-medium text-white mb-4">{activeSection}</h3>
      <p className="text-gray-400">
        Einstellungen für {activeSection.toLowerCase()} sind noch nicht
        verfügbar.
      </p>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Symbol":
        return renderSymbolSection();
      case "StatusZeile":
        return renderStatusZeileSection();
      default:
        return renderDefaultSection();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[600px] flex font-['Inter']">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Einstellungen</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex w-full mt-16">
          {/* Sidebar */}
          <div className="w-64 bg-gray-700 border-r border-gray-600">
            <div className="p-0">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left text-sm transition-colors border-b border-gray-600 last:border-b-0 ${
                    activeSection === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                >
                  <span className="mr-3 text-base">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 border-t border-gray-700 bg-gray-800">
          <select className="bg-gray-700 text-white text-sm px-3 py-1 rounded border border-gray-600">
            <option>Vorlage</option>
            <option>Standard</option>
            <option>Dunkel</option>
            <option>Hell</option>
          </select>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
