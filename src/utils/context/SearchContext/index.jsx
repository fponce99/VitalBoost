import { useState, useEffect, createContext } from "react";
import users from "../../../assets/users.json"

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [imageProduct, setImageProduct] = useState("");
  const [titleProduct, setTitleProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");

  // const getData = async () => {
  //   const response = await fetch("https://fakestoreapi.com/products");
  //   const data = await response.json();
  //   return data
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const productList = await getData();
  //       setProducts(productList);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = users.users;
        console.log(productList)
        setProducts(productList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const searchedProducts = products.filter((user) => {
    const productProfesion = user.profesion.toLowerCase();
    const productName = user.name.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return productProfesion.includes(searchText) || productName.includes(searchText);
  });

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchedProducts,
        isLoading,
        showTooltip,
        setShowTooltip,
        imageProduct,
        setImageProduct,
        titleProduct,
        setTitleProduct,
        priceProduct,
        setPriceProduct,
        descriptionProduct,
        setDescriptionProduct
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
