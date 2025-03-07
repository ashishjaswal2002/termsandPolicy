'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '@/public/Logo.png';
export default function PrivacyPolicy() {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch("");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setTerms(data.data[0].info);
        } else {
          throw new Error("No terms and conditions available");
        }
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
     <div className=' mt-[2rem] mx-auto w-[200px] h-[20px]' >
        <Image width={300} height={200} alt='one7sports Logo' src={Logo}/>

     </div>
      <h1 className=" mt-[70px] text-4xl font-bold text-center mb-8 tc">Privacy Policy</h1>
      <div className="bg-white  p-[50px] rounded-lg shadow-lg max-w-3xl mx-auto">
        <div className="prose" dangerouslySetInnerHTML={{ __html: terms }} />
       
      </div>
    </div>
  );
}
