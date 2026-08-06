import React from "react";
import { Helmet } from "react-helmet";

export default function SEOHead({
  title = "Pranav Drop Taxi – South India's Trusted One-Way Taxi Service",
  description = "South India's trusted one-way taxi service. Pay only for the distance you travel across Tamil Nadu, Bangalore, Pondicherry, Kerala & Andhra Pradesh. 24/7 doorstep pickup.",
  keywords = "drop taxi chennai, one way taxi chennai, outstation taxi chennai, airport taxi chennai, chennai to bangalore drop taxi, chennai to pondicherry taxi, cheapest drop taxi tamil nadu, outstation cabs tamil nadu, pranav drop taxi",
  canonicalUrl = "https://pranavdroptaxi.com/",
  imageUrl = "https://pranavdroptaxi.com/images/hero_highway_taxi.png",
  type = "website",
  faqs = [],
  breadcrumbs = [],
}) {
  // 1. Local Business / TaxiService JSON-LD Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Pranav Drop Taxi",
    "image": imageUrl,
    "@id": "https://pranavdroptaxi.com/#organization",
    "url": "https://pranavdroptaxi.com/",
    "telephone": "+919884949171",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0827,
      "longitude": 80.2707
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      "Tamil Nadu",
      "Chennai",
      "Bangalore",
      "Pondicherry",
      "Madurai",
      "Coimbatore",
      "Trichy",
      "Salem",
      "Vellore",
      "Kerala",
      "Andhra Pradesh"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    }
  };

  // 2. FAQ Schema
  const defaultFaqs = [
    {
      question: "How is the drop taxi fare calculated?",
      answer: "We charge purely per kilometer for the distance traveled from pickup to destination. Return charges are 100% eliminated for one-way trips."
    },
    {
      question: "Are toll fees and driver bata included?",
      answer: "Driver bata is clearly specified (e.g. ₹400 for Sedans/SUVs). Toll charges are paid directly at toll plazas as per actual highway tolls."
    },
    {
      question: "How do I book a cab with Pranav Drop Taxi?",
      answer: "You can use our instant booking form on pranavdroptaxi.com, call +91 98849 49171, or send a message on WhatsApp for 60-second confirmation."
    },
    {
      question: "Do you provide airport pickup and drops?",
      answer: "Yes! We specialize in 24/7 airport transfers for Chennai (MAA), Bangalore (BLR), Coimbatore (CJB), and Madurai (IXM) with zero delay penalties."
    }
  ];

  const activeFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": activeFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // 3. Breadcrumb Schema
  const defaultBreadcrumbs = [
    { name: "Home", item: "https://pranavdroptaxi.com/" },
    ...(breadcrumbs.length > 0 ? breadcrumbs : [])
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": defaultBreadcrumbs.map((b, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": b.name,
      "item": b.item
    }))
  };

  return (
    <Helmet defer={false}>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Pranav Drop Taxi" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Pranav Drop Taxi" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@PranavDropTaxi" />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
