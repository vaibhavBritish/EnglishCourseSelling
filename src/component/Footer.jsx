import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-6">  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap gap-4">
                <div>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={50}
                    />
                </div>
                <div>
                    <h1 className='font-bold mb-4'>Quick Links</h1>
                    <ul>
                        <li>About Us</li>
                        <li>FAQ</li>
                        <li>Contact</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
                <div>
                    <h1 className='font-bold mb-4'>Courses</h1>
                    <ul>
                        <li>English</li>
                        <li>French</li>
                    </ul>
                </div>
                <div>
                    <h1 className='font-bold mb-4'>Follow Us</h1>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer