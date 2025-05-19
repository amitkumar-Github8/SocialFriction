'use client';

import { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string;
}

interface MotivationalQuoteProps {
  category?: string;
}

const MotivationalQuote = ({ category }: MotivationalQuoteProps) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        // Build query parameters
        let queryParams = new URLSearchParams();
        if (category) queryParams.append('category', category);

        const response = await fetch(`http://localhost:5000/api/quotes/random?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch quote');
        }

        const data = await response.json();
        setQuote(data.data);
      } catch (err: any) {
        // Fallback to static quotes if API fails
        const fallbackQuotes = [
          {
            text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
            author: "Stephen Covey"
          },
          {
            text: "Almost everything will work again if you unplug it for a few minutes, including you.",
            author: "Anne Lamott"
          },
          {
            text: "Technology can be our best friend, and technology can also be the biggest party pooper of our lives.",
            author: "Steven Spielberg"
          },
          {
            text: "We are more connected than ever, yet we feel more alone.",
            author: "Sherry Turkle"
          },
          {
            text: "The real problem of humanity is that we have Paleolithic emotions, medieval institutions, and god-like technology.",
            author: "E.O. Wilson"
          }
        ];
        
        // Select a random fallback quote
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(randomQuote);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return null; // Don't show error, just don't display a quote
  }

  if (!quote) {
    return null;
  }

  return (
    <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
      <blockquote className="text-lg text-gray-800 italic mb-2">
        "{quote.text}"
      </blockquote>
      <cite className="text-sm text-gray-600 block text-right">
        — {quote.author}
      </cite>
    </div>
  );
};

export default MotivationalQuote;
