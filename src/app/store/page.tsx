'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from '../Components/mainWebsiteHeader';
import { motion } from 'framer-motion';

export default function StorePage() {
  const [selectedSize, setSelectedSize] = useState<string>('XS');
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  // Placeholder data
  const product = {
    name: 'QCSA Hoodie',
    price: 30.00,
    shortDescription: 'Hoodie description......',
    fullDescription: 'This isn\'t just merch, it\'s a symbol of our community. Designed by members, for members, the QCSA Hoodie represents our commitment to quantum computing education and collaboration at UCLA.',
    features: [
      'Official QCSA logo on chest',
      'Design on the back',
      'Machine washable - easy care',
      'Unisex design suitable for all',
      '80% cotton blah blah blah'
    ],
    images: [
      '/images/placeholder-hoodie-1.jpg', // Main image
      '/images/placeholder-hoodie-2.jpg', // Thumbnail 1
      '/images/placeholder-hoodie-3.jpg', // Thumbnail 2
      '/images/placeholder-hoodie-4.jpg', // Thumbnail 3
      '/images/placeholder-hoodie-5.jpg'  // Thumbnail 4
    ]
  };

  const handleAddToCart = () => {
    // Placeholder for cart functionality
    console.log(`Added ${product.name} (Size: ${selectedSize}) to cart`);
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#F3F8FF]">
      <MainWebsiteHeader />
      <main id="main-content">
        {/* Header Section */}
        <section className="py-8 sm:py-12 px-8 sm:px-12 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-[#234285] mb-4 font-kantumruy"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              QCSA Merch
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-[#234285] max-w-5xl mx-auto font-kantumruy md:whitespace-nowrap"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Every purchase directly supports QCSA activities, events, and member initiatives throughout the year!
            </motion.p>
          </div>
        </section>

        {/* Product Section */}
        <section className="py-8 px-8 sm:px-12 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Images */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Main Image */}
                <motion.div 
                  className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden"
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-lg font-kantumruy">Product Image {selectedImage + 1}</span>
                  </div>
                </motion.div>
                
                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-[#234285] ring-2 ring-[#234285] ring-opacity-50' 
                          : 'border-transparent hover:border-gray-400'
                      }`}
                    >
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs font-kantumruy">Img {index + 1}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Product Details */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Product Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[#234285] font-kantumruy">
                  {product.name}
                </h2>

                {/* Price */}
                <p className="text-xl sm:text-2xl font-bold text-[#234285] font-kantumruy">
                  ${product.price.toFixed(2)}
                </p>

                {/* Short Description */}
                <p className="text-base sm:text-lg text-[#234285] font-kantumruy">
                  {product.shortDescription}
                </p>

                {/* Size Selection */}
                <div className="space-y-3">
                  <label className="block text-base sm:text-lg font-semibold text-[#234285] font-kantumruy">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-md font-medium font-kantumruy transition-all ${
                          selectedSize === size
                            ? 'bg-[#234285] text-white shadow-md'
                            : 'bg-white text-[#234285] border-2 border-[#234285] hover:bg-blue-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#234285] text-white px-8 py-4 rounded-md text-base sm:text-lg font-bold font-kantumruy hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  Add to Cart
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-12 px-8 sm:px-12 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#234285] mb-6 font-kantumruy">
                Description
              </h2>
              <p className="text-base sm:text-lg text-[#234285] mb-8 leading-relaxed font-kantumruy">
                {product.fullDescription}
              </p>
              
              <h3 className="text-lg sm:text-xl font-semibold text-[#234285] mb-4 font-kantumruy">
                Features include:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#234285] font-kantumruy ml-4">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Stay Tuned Banner */}
        <section className="py-12 px-8 sm:px-12 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="bg-white rounded-lg p-8 sm:p-12 text-center shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#234285] font-kantumruy">
                Stay Tuned for More Items
              </h2>
            </motion.div>
          </div>
        </section>
      </main>
      <MainWebsiteFooter />
    </div>
  );
}
