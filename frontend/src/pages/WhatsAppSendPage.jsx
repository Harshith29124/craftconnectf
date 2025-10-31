import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WhatsAppSendPage = () => {
  const navigate = useNavigate();
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [recipientType, setRecipientType] = useState("contacts");
  const [isSending, setIsSending] = useState(false);
  
  const handleSend = async () => {
    if (!selectedRecipient) {
      alert("Please select a contact or enter a number");
      return;
    }
    
    setIsSending(true);
    console.log("Send via WhatsApp");
    // TODO: Implement actual WhatsApp sending
    setTimeout(() => {
      setIsSending(false);
      // Navigate to success or back to hub
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFFCF9]">
      {/* Header */}
      <header className="border-b border-[#f4f2f0] px-4 sm:px-6 md:px-10 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/quotation')}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#897261] hover:bg-[#fef3e9] transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="h-8 sm:h-10 rounded-full bg-[#ec6d13] px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#d8620f] transition-colors">
              Help
            </button>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#181411] mb-3">
            WhatsApp Business
          </h2>
          <p className="text-[#897261] text-base sm:text-lg">
            Send your product details and quotation directly to your customer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recipient Selection */}
          <div className="bg-white border border-[#f4f2f0] rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#181411] mb-6">
              Choose Recipient
            </h3>
            
            {/* Recipient Type Toggle */}
            <div className="mb-6">
              <div className="flex bg-[#f4f2f0] rounded-xl p-1">
                <button
                  onClick={() => setRecipientType('contacts')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    recipientType === 'contacts' 
                      ? 'bg-[#ec6d13] text-white' 
                      : 'text-[#897261] hover:text-[#181411]'
                  }`}
                >
                  Select from Contacts
                </button>
                <button
                  onClick={() => setRecipientType('number')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    recipientType === 'number' 
                      ? 'bg-[#ec6d13] text-white' 
                      : 'text-[#897261] hover:text-[#181411]'
                  }`}
                >
                  Enter Number
                </button>
              </div>
            </div>
            
            {/* Search/Input */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#897261]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 16.803a7.5 7.5 0 0 0 10.607 0Z" />
                  </svg>
                </div>
                <input 
                  type="text"
                  placeholder={recipientType === 'contacts' ? "Search by name..." : "Enter phone number..."}
                  value={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 border border-[#f4f2f0] rounded-xl bg-white text-[#181411] placeholder-[#897261] focus:border-[#ec6d13] focus:outline-none focus:ring-2 focus:ring-[#ec6d13]/20 transition-all"
                />
              </div>
            </div>
            
            {/* Mock Contact List */}
            {recipientType === 'contacts' && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#897261] mb-3">Recent Contacts</h4>
                {[
                  { name: "Customer Name", phone: "+91 98765 43210", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfqFius9QAJc5GtILRp61S4DFFuYGuPEQYaVa1-k9nGvUFJ2yEhq6RYQxOem4Z3Qxy1u4NjunSXiiPNmzzSpNrhsaddDhL-jRhdXD_ycoI2krQZXPBfjeGglX6CsiqXy24ZilKvJfBSlXUU_YmTjwNhwHSRD0QjJi6ugZoS5Kwhv1tac76eUq1FpDdlB5iEmU0imHz051jpLOk5ydNtwriM-3fktXTzEJCw3PAwcBY6p-UKcWF3E66F_ei9-5APLkPFTTey4Wxcfc" }
                ].map((contact, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedRecipient(contact.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      selectedRecipient === contact.name 
                        ? 'bg-[#fef3e9] border-2 border-[#ec6d13]' 
                        : 'bg-[#f4f2f0] hover:bg-[#fef3e9]'
                    }`}
                  >
                    <div 
                      className="h-10 w-10 rounded-full bg-cover bg-center" 
                      style={{backgroundImage: `url('${contact.avatar}')`}} 
                    />
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-[#181411]">{contact.name}</p>
                      <p className="text-sm text-[#897261]">{contact.phone}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message Preview */}
          <div className="bg-white border border-[#f4f2f0] rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#181411] mb-6">
              Message Preview
            </h3>
            
            {/* Chat-style Preview */}
            <div className="space-y-4 mb-6">
              {/* Product Card Message */}
              <div className="max-w-xs bg-[#25D366] rounded-2xl rounded-bl-md p-4 text-white">
                <div className="bg-white rounded-lg p-3 mb-3">
                  <img 
                    className="w-full aspect-square rounded-lg object-cover mb-3" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWoEsMeMO5Rkz8RkHwgzI1KlJAyx6wo8-fPGkhEGTkghbsGSJjaXHgqR2NItrVCinjwcitcH5AGL-edkcpJNTc326kf8zr9f8UEz-mrI3iKbaLynC4FTD0N4NS-Yi-D8PVi4EqNDOixIxYB5c1mqO7Ry_Qn8ioLRSGapo5gdtpFNjD1R5MOTAaNsJVy768QfbtzQC1lBeZ4F0cvPefiHB2YbRJjrW6LQH8pWAmhTiF2Lr4Uw_Y0aQP2xYlHXKMFYl_BZ3kyRTXCvM" 
                    alt="Hand-Carved Wooden Bowl" 
                  />
                  <h4 className="font-bold text-[#181411] text-sm mb-1">
                    Hand-Carved Wooden Bowl
                  </h4>
                  <p className="text-2xl font-bold text-[#ec6d13] mb-2">
                    ₹4,250
                  </p>
                  <p className="text-xs text-[#897261] leading-relaxed">
                    A unique, one-of-a-kind decorative bowl, meticulously hand-carved from sustainable mango wood.
                  </p>
                </div>
                <p className="text-sm">
                  Hi! 👋 Your handmade Hand-Carved Wooden Bowl is ready. Here are the details... We hope you love it! You can complete your purchase here: [Link]
                </p>
                <p className="text-xs opacity-75 mt-2 text-right">12:34 PM</p>
              </div>
            </div>
            
            {/* Edit Options */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="flex-1 h-10 px-4 rounded-xl bg-white border border-[#f4f2f0] text-[#181411] font-medium hover:bg-[#fef3e9] hover:border-[#ec6d13]/20 transition-all duration-200"
              >
                Edit Message
              </button>
              <button 
                className="flex-1 h-10 px-4 rounded-xl bg-white border border-[#f4f2f0] text-[#181411] font-medium hover:bg-[#fef3e9] hover:border-[#ec6d13]/20 transition-all duration-200"
              >
                Add Payment Link
              </button>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleSend}
            disabled={!selectedRecipient || isSending}
            className="w-full max-w-md h-14 px-6 rounded-xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#22c55e] focus:outline-none focus:ring-4 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            {isSending ? (
              <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.182-.133-.38-.232"/>
                </svg>
                Send Message
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default WhatsAppSendPage;