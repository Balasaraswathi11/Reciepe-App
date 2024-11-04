import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import ramen from "../assets/ramen.jpg";
import { server } from '../main';
const RecipeList = () => {
    const [recipe, setRecipe] = useState([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleclick = (id) => {
        navigate(`/reci/${id}`);
    };

    const handledelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmDelete) {
            try {
                await axios.delete(`${server}/api/reci/delete/${id}`);
                alert("Recipe deleted successfully!");
            } catch (error) {
                console.error("Error deleting recipe:", error);
                alert("Failed to delete the recipe. Please try again.");
            }
        }
    };

    const handleCategory = (e) => {
        setCategory(e);
    };

    useEffect(() => {
        const getAllRecipes = async () => {
            try {
                const fetchRecipes = await axios.get(`${server}/api/reci/allreci`);
                setRecipe(fetchRecipes.data.message);
                console.log(fetchRecipes.data.message);
            } catch (error) {
                console.log("Error occurred", error);
            } finally {
                setLoading(false);
            }
        };
        getAllRecipes();
    }, []);

    // Combine search and category filtering
    const filteredRecipes = useMemo(() => {
        return recipe.filter(reci => 
            (category === "All" || reci.categories.includes(category)) &&
            reci.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [category, search, recipe]);

    return (
        <>
            {loading && <h3>Loading...</h3>}
            <div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className='flex justify-center items-center mx-10 my-5'>
                        <div className='relative w-full max-w-lg'>
                            <FaSearch 
                                style={{ position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)", color: "gray" }} 
                            />
                            <input 
                                type="text" 
                                placeholder='Search for food' 
                                className='pl-10 pr-4 py-3 text-black w-full border rounded-md' 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <h1 className='text-4xl font-pop font-bold text-center px-20 text-white'>Category</h1>

                    <div className='flex justify-center gap-4 py-4 flex-wrap'>
                        {['All', 'veg', 'non-veg', 'dinner', 'breakfast', 'lunch'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategory(cat)}
                                className={`md:px-4 my-5 rounded w-[150px] h-[50px] ${
                                    category === cat ? 'bg-red-400 text-black border-2 border-s-white font-pop' : 'bg-white text-black font-pop'
                                }`}
                                style={{ flexShrink: 0 }} 
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    <h1 className='text-4xl font-pop font-bold text-center px-20 text-white'>Some Recipes</h1>

                    <div className='flex flex-row justify-center flex-wrap gap-10 py-10'>
                        {filteredRecipes.map((reci) => (
                            <div className='flex flex-col rounded-lg justify-center items-center px-3 py-2 shadow-xl w-[250px] h-[330px] bg-white' onClick={() => handleclick(reci._id)} key={reci._id}>
                                <img src={`${server}/${reci.image}`} alt={reci.title} style={{ width: '250px', height: "200px" }} />
                                <h1 className='text-center font-pop text-black text-lg '>{reci.title}</h1>
                                <p className='text-center font-pop text-sm py-2 text-gray-800'>{reci.cookingTime} mins</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Create Recipe Section */}
                <div className='flex flex-col justify-center items-center bg-white text-black p-5 mt-10'>
                    <h1 className='md:text-4xl text-2xl my-10 font-pop font-bold'>Create your own recipe</h1>  
                    <button 
                        className="bg-red-500 text-white rounded-md md:px-10 px-5 md:py-5 py-3 mb-10" 
                        onClick={() => navigate("/create")}
                    >
                        Click here
                    </button>
                </div>
            </div>
        </>
    );
};

export default RecipeList;
