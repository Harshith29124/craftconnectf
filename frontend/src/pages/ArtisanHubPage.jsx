import React from "react";
import { useNavigate } from "react-router-dom";

const ArtisanHubPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'enhancer',
      title: 'Smart Product Enhancer',
      description: 'Refine your product descriptions',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      ),
      onClick: () => navigate('/enhancer')
    },
    {
      id: 'quotation',
      title: 'AI Quotation Generator',
      description: 'Create custom quotes instantly',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      onClick: () => navigate('/quotation')
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Business',
      description: 'Connect with your customers',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      ),
      onClick: () => navigate('/whatsapp-send')
    },
    {
      id: 'instagram',
      title: 'Instagram Marketing',
      description: 'Boost your social presence',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
      ),
      onClick: () => navigate('/instagram-post')
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF9]">
      {/* Header */}
      <header className="border-b border-[#f4f2f0] px-4 sm:px-6 md:px-10 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#897261] hover:bg-[#fef3e9] transition-colors sm:hidden"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/')}
              className="text-sm font-medium text-[#897261] hover:text-[#181411] transition-colors"
            >
              Home
            </button>
            <span className="text-sm font-medium text-[#ec6d13]">Hub</span>
            <button className="text-sm font-medium text-[#897261] hover:text-[#181411] transition-colors">
              Messages
            </button>
            <button className="text-sm font-medium text-[#897261] hover:text-[#181411] transition-colors">
              Account
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="h-8 sm:h-10 rounded-full bg-[#ec6d13] px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#d8620f] transition-colors">
              Help
            </button>
            <div 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-cover bg-center" 
              style={{backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVBjXjipHZ-6IumnklMpka3WafA4sNRLwwZzUADBwVXjbwODh9Wh6hbrDXiKvIbw0p6JAcO7KwmsZHPNgz1ZilesxbmSDUzKIZl13kivszRjwJ85Aap4ehm12rylXKrfa6Vak4EltXoQlOOEF_3sFOrtiRYCJP4caCHLzqQCO3bbXNARHadr7UEojhDa9zwwxQN92OD_TAw9d-8UDkI3G18t_DKFXHZQ3SbxOTrDEN2SztMBOrwShLzUZRvTSVzIH0U5X6DLC0e3M')"}}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8">
        {/* Profile Card */}
        <div className="mb-8">
          <div className="bg-white border border-[#f4f2f0] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div 
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-cover bg-center" 
                style={{backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSQ_XfCaQkmHbqwxEMXIJ5z0r7YIZDyN20mP9fQxC93saLXhalHqXWDsGEY30_1cpwOCr9le9eI8il5PSt2q6iLXd8yy_HjJ_lq5hKVrOb0NFwaQrOiVfhYrTmJAz6MFhz6jqviiIx9j1b4UgetENhUCaaEG5sCsKAc-r7qlrwje9nefr-41JmvNW6USGebmMVY8-vmQIYDmJWvb4AKAaNmcFowinxCIkgQ8BN4hwqrg-mB-jPwIki7t876y1SwOZT11ySx6_uYPM')"}} 
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#181411]">
                  Elena Moreau
                </h2>
                <p className="text-[#897261] text-sm sm:text-base mt-1">
                  Artisan Weaves & Co.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={feature.onClick}
              className="group bg-white border border-[#f4f2f0] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#ec6d13]/20 transition-all duration-200 text-left"
            >
              <div className="text-[#ec6d13] mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#181411] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#897261] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Shopify Integration Card */}
        <div className="bg-white border border-[#f4f2f0] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="text-[#ec6d13] flex-shrink-0">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72L4.318 3.44A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#181411] mb-2">
                Sell on Shopify (Craft Connect Hub)
              </h3>
              <p className="text-[#897261] text-base leading-relaxed mb-4">
                Leverage our partnership to reach a wider audience and grow your business seamlessly.
              </p>
            </div>
            <button
              onClick={() => navigate('/shopify-launch')}
              className="flex-shrink-0 h-12 px-6 rounded-xl bg-[#ec6d13] text-white font-semibold hover:bg-[#d8620f] focus:outline-none focus:ring-4 focus:ring-[#ec6d13]/50 transition-all duration-200"
            >
              Launch Shop
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtisanHubPage;