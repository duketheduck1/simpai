import { useState } from 'react';

interface CopyablePreProps {
  content: string;
  className?: string;
  type: string;
  onEdit?: (newContent: string) => void;
}

export const CopyablePre = ({ content, className = '' }: CopyablePreProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboardFallback = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Prevent scroll jump
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textarea);
  };

  const handleCopy = async () => {
    
    try {      
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(content);
      } else {
        copyToClipboardFallback(content);
      }
      
      setCopied(true);      
      setTimeout(() => setCopied(false), 2000);      
    } catch (error){
      console.log("Copy failed: ", error);
    };
  
  };

  
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(content)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative group border rounded-lg p-4 ${className}`}>        
        <pre className="whitespace-pre-wrap break-words">
            {content}
        </pre>        

      <hr className="my-2 border-gray-300" />
      
      <div className="flex justify-end gap-1">
        <button
          onClick={shareToFacebook}
          className="p-2 rounded-full hover:bg-blue-200 transition-colors  border-2 border-gray-300"
          title="Share to Facebook"
          aria-label="Share to Facebook"
        >
          <FacebookIcon size={18} className="text-blue-600" />
        </button>
        
        <button
          onClick={shareToTwitter}
          className="p-2 rounded-full hover:bg-blue-300 hover:text-white transition-colors border-2 border-gray-300"
          title="Share to X (Twitter)"
          aria-label="Share to X (Twitter)"
        >
          <TwitterIcon size={18} className="text-blue-200" />
        </button>
                
        <button
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors border-2 border-gray-300"
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
            >
            {copied ? (
                //<span className="text-green-500">✓</span>
                //<img src="/icons/check.svg" alt="check" height={18} width={18} />
                <CheckIcon size={18} className="w-18 h-18 text-green-600" /> // Darker green
            ) : (
                <CopyIcon size={18} className="text-gray-500" />
            )}
        </button>
        
      </div>
    </div>
  );
};

// Icon components
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const CopyIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const FacebookIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

interface CheckIconProps {
  size?: number;
  className?: string;
}

export const CheckIcon = ({ size = 24, className = '' }: CheckIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" // Will inherit text color
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-green-500 ${className}`} // Tailwind green
  >
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

//Image
export const CopyableImage = ({ content, className = '', type='IMAGE' }: CopyablePreProps) => {
  const [copied, setCopied] = useState(false);    

  const copyToClipboardFallback = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Prevent scroll jump
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textarea);
  };

  const handleCopy = async () => {
    
    try {      
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(content);
      } else {
        copyToClipboardFallback(content);
      }
      
      setCopied(true);      
      setTimeout(() => setCopied(false), 2000);      
    } catch (error){
      console.log("Copy failed: ", error);
    };
  
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(content)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative group border rounded-lg p-4 ${className}`}> 
        {type === "IMAGE" ? (          
          <img src={content} alt="image" height={500} width={500}/>  
        ) : (
          <audio
            controls
            src={content}
            className="mt-5"            
          />
        )}       
        

      <hr className="my-2 border-gray-300" />
      
      <div className="flex justify-end gap-1">
        <button
          onClick={shareToFacebook}
          className="p-2 rounded-full hover:bg-blue-200 transition-colors  border-2 border-gray-300"
          title="Share to Facebook"
          aria-label="Share to Facebook"
        >
          <FacebookIcon size={18} className="text-blue-600" />
        </button>
        
        <button
          onClick={shareToTwitter}
          className="p-2 rounded-full hover:bg-blue-300 hover:text-white transition-colors border-2 border-gray-300"
          title="Share to X (Twitter)"
          aria-label="Share to X (Twitter)"
        >
          <TwitterIcon size={18} className="text-blue-200" />
        </button>
                
        <button
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors border-2 border-gray-300"
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
            >
            {copied ? (
                //<span className="text-green-500">✓</span>
                //<img src="/icons/check.svg" alt="check" height={18} width={18} />
                <CheckIcon size={18} className="w-18 h-18 text-green-600" /> // Darker green
            ) : (
                <CopyIcon size={18} className="text-gray-500" />
            )}
        </button>
        
      </div>
    </div>
  );
};