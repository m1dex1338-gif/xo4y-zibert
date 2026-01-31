import React from 'react';
import categoriesData from '../../Categories.json'; 
import productsData from '../../Product.json'; 

const Categories = () => {
  const categoriesList = categoriesData.categories;

  const getCategoryImage = (categoryName) => {
    const product = productsData.find(item => item && item.category === categoryName);
    return product ? product.image : 'https://via.placeholder.com/300?text=No+Image';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Каталог</h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '30px' 
      }}>
        {categoriesList.map((category) => (
          <div 
            key={category.id} 
            style={{ 
              border: '1px solid #eee', 
              borderRadius: '10px', 
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s',
              backgroundColor: '#fff'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Image */}
            <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={getCategoryImage(category.name)} 
                alt={category.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Information about category */}
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>
                {category.name}
              </h3>
              {/* Show count of items in category */}
              <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>
                {category.count} шт.
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Categories;