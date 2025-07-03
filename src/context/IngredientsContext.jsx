// src/context/IngredientsContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

//створили контекст
const IngredientsContext = createContext();

const INGREDIENTS_KEY = 'ingredients_cache';
const CACHE_TTL = 1000 * 60 * 60 * 24; // cache time to live - 24 години

export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        // перевірка чи вже є кешовані елементи
        const cached = localStorage.getItem(INGREDIENTS_KEY);

        //якщо кеш знайдено
        if (cached) {
          const parsed = JSON.parse(cached);
          const now = Date.now();

          // перевірка "свіжості" кешу. Свіжий?
          //* parsed.timestamp — коли кеш було збережено
          if (now - parsed.timestamp < CACHE_TTL) {
            setIngredients(parsed.data);
            return;
          }
        }

        // Якщо кешу нема або протермінований — фетчимо з бекенду
        const { data } = await axios.get(
          'https://backendrepo-ormv.onrender.com/api/ingredients'
        );
        setIngredients(data);
        //зберігаєм нові данні в локал сторедж
        localStorage.setItem(
          INGREDIENTS_KEY,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      } catch (err) {
        console.error('Failed to load ingredients:', err);
      }
    };

    loadIngredients();
  }, []);

  return (
    <IngredientsContext.Provider value={ingredients}>
      {children}
    </IngredientsContext.Provider>
  );
};

// Хук для використання
export const useIngredients = () => {
  return useContext(IngredientsContext);
};
