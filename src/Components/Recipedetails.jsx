import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import book from "../assets/table3.png"; // Ensure this image path is correct

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const [updateStatus, setUpdateStatus] = useState(""); // State to show update status

    const handleupdate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/reci/update/${id}`);
            setUpdateStatus("Recipe updated successfully!");
        } catch (error) {
            console.error("Error updating recipe:", error);
            setUpdateStatus("Failed to update recipe.");
        }
    };

    useEffect(() => {
        const fetchRecipeById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/reci/getrecibyid/${id}`);
                setRecipe(response.data.recipe);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };

        fetchRecipeById();
    }, [id]);

    if (!recipe) {
        return <h3>Loading...</h3>;
    }

    const ingredientarr = recipe.ingredients[0].split(",").map((ing) => {
        return ing.charAt(0).toUpperCase() + ing.slice(1).toLowerCase().trim();
    });

    const stepsString = recipe.steps[0];
    const stepsArray = stepsString.split(".").map(step => step.trim()).filter(step => step);

    return (
        <div className="flex flex-col justify-center items-center text-black shadow-2xl">
            <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-5 m-4 md:w-[900px]">
                <div className='flex flex-col justify-center items-center'>
                    <img src={`http://localhost:5000/${recipe.image}`} alt={recipe.title} style={{ width: '400px', borderRadius: '8px' }} />
                </div>

                <h1 className="text-2xl text-center font-bold mb-4">{recipe.title}</h1>
                <div className='flex justify-center items-center'>
                    <p className="mt-2 w-[350px] text-center">{recipe.description}</p>
                </div>

                <div className='flex justify-center items-center mt-4'>
                    <div className="bg-red-400 w-[100px] h-[100px] text-center flex flex-col justify-center items-center mx-2 rounded-2xl">
                        <span className='text-4xl'>⌚</span>
                        <br />
                        {recipe.cookingTime} mins
                    </div>
                    <div className="bg-red-400 w-[100px] h-[100px] text-center flex flex-col justify-center items-center mx-2 rounded-2xl">
                        <span className='text-4xl'>🔥</span>
                        <br />
                        {recipe.calories}
                    </div>
                    <div className="bg-red-400 w-[100px] h-[100px] text-center flex flex-col justify-center items-center mx-2 rounded-2xl">
                        <span className='text-4xl'>🍲</span>
                        <br />
                        {recipe.cookingStyle}
                    </div>
                </div>

                <h3 className="mt-4 font-semibold text-left text-xl md:px-10 font-pop">Ingredients:</h3>
                <ul className="list-disc ml-5 text-left md:px-20 px-5 py-5">
                    {ingredientarr.map((ing, i) => (
                        <li key={i}>{ing}</li>
                    ))}
                </ul>

                <h3 className="mt-4 font-semibold text-left text-xl md:px-10 font-pop">Steps:</h3>
                <ol className="list-decimal ml-5 text-left md:px-20 px-4 py-5">
                    {stepsArray.map((step, index) => (
                        <li key={index} className='md:px-4 px-2 py-2 font-pop'>{step}</li>
                    ))}
                </ol>

                

                {updateStatus && <p className="mt-4 text-center text-green-600">{updateStatus}</p>}
            </div>
        </div>
    );
};

export default RecipeDetails;
