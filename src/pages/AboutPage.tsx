// src/pages/AboutPage.tsx
import Metadata from '../seo/MetaData';

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <span>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} style={{ color: '#facc15', fontSize: '1.1rem' }}>★</span>
      ))}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} style={{ color: '#d1d5db', fontSize: '1.1rem' }}>☆</span>
      ))}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main id="main-content" className="container">
      <Metadata title="About" />
      <h1 className="section-title" style={{ marginTop: '1.2rem' }}>Our Story</h1>
      <div className="card">
        <p>
          Dynasty King is a family-owned Chinese restaurant proudly serving the Tallman, NY community. Founded by 
          immigrants from China, our story is one of tradition, perseverance, and passion for authentic cuisine.
        </p>
        <p>
          From humble beginnings, the owners brought with them cherished family recipes and the dedication to
          recreate the flavors of home. Every dish we serve reflects the rich culinary heritage of  
          China—hand-crafted with care and fresh ingredients that defines true Chinese cooking.
        </p>
        <p>
          For us, Dynasty King is more than just a restaurant. It is a place where family, friends, and
          neighbors can gather, share a meal, and feel at home. Our mission has always been to bring people
          together through food that celebrates culture, honors tradition, and creates lasting memories.
        </p>
      </div>

      <h2 className="section-title">Reviews</h2>
      <ul className="card" style={{ lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Eric B.</strong> <br />
          <StarRating rating={5} />
          <p>“Best Chinese food in Rockland! Always fast service and high quality food. All the workers are so 
            friendly and pleasant. I go all the time 10/10”</p>
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>David N.</strong> <br />
          <StarRating rating={5} />
          <p>“Nothing short of a top tier restaurant. Some of the best tasting Chinese food around! What helpful 
            staff and amazing cooks as well as service. Go to take out every single time.”</p>
        </li>
        <li>
          <strong>Adam M.</strong> <br />
          <StarRating rating={5} />
          <p>“I've been eating at this place since I was maybe 12, and it never disappoints. 
            Pork fried rice, sesame chicken and a snapple *chefs kiss*”</p>
        </li>
      </ul>
    </main>
  );
}
