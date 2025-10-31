import React from "react";
import { useNavigate } from "react-router-dom";

const QuotationResultPage = () => {
  const navigate = useNavigate();

  const breakdown = [
    {
      label: 'Base Price',
      value: '₹3,000',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      )
    },
    {
      label: 'Taxes / GST (18%)',
      value: '₹540',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" />
        </svg>
      )
    },
    {
      label: 'Packaging & Materials Fee',
      value: '₹160',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      )
    },
    {
      label: 'Estimated Labor Cost',
      value: '₹550',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    }
  ];

  const handleSendWhatsApp = () => {
    console.log("Send via WhatsApp");
    navigate('/whatsapp-send');
  };

  const handleAdjustPrice = () => {
    console.log("Adjust price manually");
  };

  const handleGeneratePDF = () => {
    console.log("Generate invoice/PDF");
  };

  return (
    <div className="min-h-screen bg-[#FFFCF9]">
      {/* Header */}
      <header className="border-b border-[#f4f2f0] px-4 sm:px-6 md:px-10 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/hub')}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#897261] hover:bg-[#fef3e9] transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="h-6 w-6 text-[#ec6d13]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#181411]">
              CraftConnect
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/hub')}
              className="text-sm font-medium text-[#897261] hover:text-[#181411] transition-colors"
            >
              Dashboard
            </button>
            <button className="text-sm font-medium text-[#897261] hover:text-[#181411] transition-colors">
              Products
            </button>
            <span className="text-sm font-bold text-[#ec6d13]">Quotations</span>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="h-8 sm:h-10 rounded-full bg-[#ec6d13] px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#d8620f] transition-colors">
              Help
            </button>
            <div 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-cover bg-center" 
              style={{backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDl5v6DncWSCQ0ZH5fgJYBDuTOBPBekLhJZNBqkiljWvl6He7JKbL77VHbeBUBI5la2njbyFStRzQRg_AASfgjm2a5LmRfXqcvk5FkRbYpzyLlehjEaaXpzjP6ulj6SEW2cZJUBSRI42VhZIeQWLP1D3wKfQiMGc2_nyIGOrj3STEx6B5FZ9Nzua6lj7FqOS87FZSa00e2NiugpeoInL6Th2IJvDNTzqutDmiU3U1pdJTmVebbl5l36PvH91MqQKfr9bS4BbdMwPJ8')"}} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#181411] mb-3">
            AI Suggested Quotation
          </h2>
          <p className="text-[#897261] text-base sm:text-lg max-w-2xl mx-auto">
            Here is the AI-generated pricing for your product. You can adjust, finalize, and send it directly to your client.
          </p>
        </div>

        {/* Quotation Card */}
        <div className="bg-white border border-[#f4f2f0] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Product Details */}
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#181411] mb-3">
              Hand-Carved Wooden Bowl
            </h3>
            <p className="text-[#897261] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              AI-Generated Description: A unique, one-of-a-kind decorative bowl, meticulously hand-carved from sustainable mango wood, perfect for adding a touch of rustic elegance to any home.
            </p>
          </div>

          {/* Giant Price Display */}
          <div className="text-center mb-8 p-8 bg-[#fef3e9] border border-[#ec6d13]/10 rounded-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#897261] mb-4">
              Final Suggested Price
            </p>
            <p className="text-5xl sm:text-6xl md:text-7xl font-black text-[#ec6d13] leading-none">
              ₹4,250
            </p>
          </div>

          {/* Breakdown */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-[#181411] mb-6 pb-3 border-b border-[#f4f2f0]">
              Detailed Breakdown
            </h4>
            <div className="space-y-4">
              {breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="text-[#897261]">
                      {item.icon}
                    </div>
                    <span className="font-medium text-[#181411]">{item.label}</span>
                  </div>
                  <span className="text-lg font-bold text-[#181411]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#f4f2f0]">
            <button 
              onClick={handleAdjustPrice}
              className="flex-1 h-12 px-4 rounded-xl bg-white border border-[#f4f2f0] text-[#181411] font-semibold hover:bg-[#fef3e9] hover:border-[#ec6d13]/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              Adjust Price Manually
            </button>
            
            <button 
              onClick={handleGeneratePDF}
              className="flex-1 h-12 px-4 rounded-xl bg-white border-2 border-[#ec6d13] text-[#ec6d13] font-semibold hover:bg-[#ec6d13]/5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Generate Invoice/PDF
            </button>
            
            <button 
              onClick={handleSendWhatsApp}
              className="flex-1 h-12 px-4 rounded-xl bg-[#ec6d13] text-white font-semibold hover:bg-[#d8620f] focus:outline-none focus:ring-4 focus:ring-[#ec6d13]/50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.182-.133-.38-.232"/>
              </svg>
              Send via WhatsApp
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuotationResultPage;