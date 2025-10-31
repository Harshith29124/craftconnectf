import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstagramReviewPostPage = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(true); // Mock connection status
  const [isPosting, setIsPosting] = useState(false);
  
  const handleConnect = () => {
    console.log("Connect Instagram account");
    setIsConnected(true);
  };
  
  const handleDisconnect = () => {
    console.log("Disconnect Instagram account");
    setIsConnected(false);
  };
  
  const handleEdit = () => {
    console.log("Edit caption");
  };
  
  const handlePost = async () => {
    setIsPosting(true);
    console.log("Post to Instagram");
    // TODO: Implement actual Instagram posting
    setTimeout(() => {
      setIsPosting(false);
      // Navigate to success page or back to hub
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="h-8 sm:h-10 rounded-full bg-[#ec6d13] px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#d8620f] transition-colors">
              Help
            </button>
            <div 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-cover bg-center" 
              style={{backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfqFius9QAJc5GtILRp61S4DFFuYGuPEQYaVa1-k9nGvUFJ2yEhq6RYQxOem4Z3Qxy1u4NjunSXiiPNmzzSpNrhsaddDhL-jRhdXD_ycoI2krQZXPBfjeGglX6CsiqXy24ZilKvJfBSlXUU_YmTjwNhwHSRD0QjJi6ugZoS5Kwhv1tac76eUq1FpDdlB5iEmU0imHz051jpLOk5ydNtwriM-3fktXTzEJCw3PAwcBY6p-UKcWF3E66F_ei9-5APLkPFTTey4Wxcfc')"}} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#181411] mb-3">
            Instagram Marketing
          </h2>
          <p className="text-[#897261] text-base sm:text-lg max-w-2xl mx-auto">
            Securely connect your account, then review and publish your post.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Area */}
          <div className="bg-white border border-[#f4f2f0] rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#181411] mb-4">
              Instagram Account
            </h3>
            
            {isConnected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#fef3e9] border border-[#ec6d13]/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-full bg-cover bg-center" 
                      style={{backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfqFius9QAJc5GtILRp61S4DFFuYGuPEQYaVa1-k9nGvUFJ2yEhq6RYQxOem4Z3Qxy1u4NjunSXiiPNmzzSpNrhsaddDhL-jRhdXD_ycoI2krQZXPBfjeGglX6CsiqXy24ZilKvJfBSlXUU_YmTjwNhwHSRD0QjJi6ugZoS5Kwhv1tac76eUq1FpDdlB5iEmU0imHz051jpLOk5ydNtwriM-3fktXTzEJCw3PAwcBY6p-UKcWF3E66F_ei9-5APLkPFTTey4Wxcfc')"}} 
                    />
                    <div>
                      <p className="font-semibold text-[#181411]">@artisan_handle</p>
                      <p className="text-sm text-[#897261]">Connected</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="text-sm font-semibold text-[#ec6d13] hover:text-[#d8620f] transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  <p className="text-sm text-green-800">
                    Your account is connected safely using Instagram's official platform. We never store your password.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#fef3e9] rounded-2xl flex items-center justify-center text-[#ec6d13] mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-[#181411] mb-2">
                  Connect Your Instagram
                </h4>
                <p className="text-[#897261] text-sm mb-6">
                  Link your Instagram account to post your enhanced product photos.
                </p>
                <button 
                  onClick={handleConnect}
                  className="h-12 px-6 bg-[#ec6d13] text-white font-semibold rounded-xl hover:bg-[#d8620f] transition-colors"
                >
                  Connect Instagram Account
                </button>
              </div>
            )}
          </div>

          {/* Post Preview */}
          <div className="">
            <h3 className="text-lg font-bold text-[#181411] mb-4">
              Post Preview
            </h3>
            
            {/* Mobile Instagram Post Mock */}
            <div className="bg-white border border-[#f4f2f0] rounded-2xl overflow-hidden shadow-sm max-w-sm mx-auto lg:mx-0">
              {/* Instagram Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#f4f2f0]">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-8 w-8 rounded-full bg-cover bg-center" 
                    style={{backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDf7zpeKo_3XUsDUtTYCI0so9i7eoxTAj0wUQN4xMCLXY45RayXbbVFvReESYLd8Vqess8HIqCXu5Hi_bsf7C2p5mInUvVwN1SQBjidamCfCPgCr36GLeza1MbQxxuva1NZqrRdAVEOoyiblChtUfUMXuFVkCRBHcs1Oow6nOWwjAVuefW5Zy1FoUE9Jds479jd6QfmHikLxFTDm0c6NNb9BLgPJqPRBnFK-xbSpRTJUOz7j-W1N7xpAdRDPX5HqERPbadOuYRekNI')"}} 
                  />
                  <span className="font-semibold text-[#181411] text-sm">
                    artisan_handle
                  </span>
                </div>
                <button className="text-[#897261]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                  </svg>
                </button>
              </div>
              
              {/* Enhanced Product Image */}
              <div 
                className="aspect-square bg-cover bg-center" 
                style={{backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3sYdRqOmlPw0BJ5xv0nKksw8G3O2fHbufJX4mXXrQkBVQ9BTHCqO7hKt8_AFvFY2xU5dn-54U8jxH5W4gVlOR4_MU9Ew-kwvPPXac60cPFQv3BPT1pnvFFQh0R_DhFnEgYMcobkpUlFjjQtDQDG21H-tn_HDDPK3v0jWqzWyCQl-YU_BMEI747xV6lr_VKsejw8V6wf8qcZoHt116AP2J67lDpP66Y8oEFhxjA0E3GiI8SoGNgdDJkveVPbmon-1L0jYDsk9_a-I')"}} 
              />
              
              {/* Instagram Actions & Caption */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <svg className="h-6 w-6 text-[#181411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0Z" />
                    </svg>
                    <svg className="h-6 w-6 text-[#181411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8-4-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-4 4Z" />
                    </svg>
                    <svg className="h-6 w-6 text-[#181411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </div>
                  <svg className="h-6 w-6 text-[#181411]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5Z" />
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-[#181411]">
                    <span className="font-semibold">artisan_handle</span> Introducing our new handcrafted ceramic vase! Each piece is uniquely shaped and glazed, perfect for adding a touch of rustic charm to your home. ✨
                  </p>
                  <p className="text-sm text-[#ec6d13] font-medium">
                    #handmade #ceramics #potterylove #shoplocal #artisanmade #handcrafted #homeDecor
                  </p>
                  <p className="text-xs text-[#897261]">
                    View all 12 comments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <button 
            onClick={handleEdit}
            className="flex-1 h-12 px-6 rounded-xl bg-white border border-[#f4f2f0] text-[#181411] font-semibold hover:bg-[#fef3e9] hover:border-[#ec6d13]/20 transition-all duration-200"
          >
            Edit Caption / Hashtags
          </button>
          
          <button 
            onClick={handlePost}
            disabled={!isConnected || isPosting}
            className="flex-1 h-12 px-6 rounded-xl bg-[#ec6d13] text-white font-semibold hover:bg-[#d8620f] focus:outline-none focus:ring-4 focus:ring-[#ec6d13]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isPosting ? (
              <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Posting...
              </>
            ) : (
              "Post to Instagram Now"
            )}
          </button>
        </div>
        
        {!isConnected && (
          <div className="mt-6 text-center">
            <button 
              onClick={handleConnect}
              className="h-12 px-8 bg-[#ec6d13] text-white font-semibold rounded-xl hover:bg-[#d8620f] transition-colors"
            >
              Connect Instagram Account
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default InstagramReviewPostPage;