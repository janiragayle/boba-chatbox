"use client"; // This ensures the component is treated as a Client Component

import Link from 'next/link';
import React from 'react';

export default function InteractiveLink() {
  const handleScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector('#tea');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div onClick={handleScroll}>
      <Link href="#tea">
        <h3 className="menu">↓ Menu ↓</h3>
      </Link>
    </div>
  );
}
