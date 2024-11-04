import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from "../assets/cherry.jpg";
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        calories: '',
        cookingTime: '',
        steps: [], // Change from string to array
        cookingStyle: 'medium',
        categories: [],
        image: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        // Append other recipe data
        for (const key in recipe) {
            if (key === 'categories') {
                // Append each category separately
                recipe.categories.forEach((category) => form.append('categories', category));
            } else if (key === 'steps') {
                // Append steps as individual items
                recipe.steps.forEach((step) => form.append('steps', step));
            } else {
                form.append(key, recipe[key]);
            }
        }

        try {
            const response = await axios.post('http://localhost:5000/api/reci/createreci', form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            alert("Recipe created successfully");
            console.log(response.data);
            setTimeout(() => navigate("/reci"), 100); 
        } catch (error) {
            console.error('Error creating recipe:', error);
            alert('Failed to create recipe.');
        }
    };

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;

        if (name === "image") {
            setRecipe({ ...recipe, [name]: files[0] });
        } else if (type === "checkbox") {
            setRecipe((prevRecipe) => {
                if (checked) {
                    return {
                        ...prevRecipe,
                        categories: [...prevRecipe.categories, value],
                    };
                } else {
                    return {
                        ...prevRecipe,
                        categories: prevRecipe.categories.filter((category) => category !== value),
                    };
                }
            });
        } else if (name === "steps") {
            // Split the steps input by newline and remove empty lines
            const stepsArray = value.split('\n').filter(step => step.trim() !== '');
            setRecipe({ ...recipe, steps: stepsArray });
        } else {
            setRecipe({ ...recipe, [name]: value });
        }
    };

    return (
        <div
          
        >
            <h1 className='text-3xl font-pop font-bold text-center py-5 text-red-00 shadow-sm'>Create Your Own Recipe</h1>
            <div className="flex items-center justify-center max-w-lg min-h-screen m-auto border-solid border-3 border-orange-600 rounded-lg px-10  bg-white shadow-2xl  text-black">
                <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-2 formele'>
                    <label>
                        Title:
                        <input type="text" name="title" value={recipe.title} onChange={handleChange} required className="border p-1 w-full" />
                    </label>
                    
                    <label>
                        Description:
                        <textarea name="description" value={recipe.description} onChange={handleChange} required className="border p-1 w-full" />
                    </label>
                    
                    <label>
                        Ingredients:
                        <input type="text" name="ingredients" value={recipe.ingredients} onChange={handleChange} required className="border p-2 w-full" />
                    </label>
                    
                    <label>
                        Calories:
                        <input type="number" name="calories" value={recipe.calories} onChange={handleChange} required className="border p-1 w-full" />
                    </label>
                    
                    <label>
                        Cooking Time (minutes):
                        <input type="number" name="cookingTime" value={recipe.cookingTime} onChange={handleChange} required className="border p-1 w-full" />
                    </label>
                    
                    <label>
                        Cooking Style:
                        <select name="cookingStyle" value={recipe.cookingStyle} onChange={handleChange} className="border p-3 w-full text-sm mt-2 text-gray-500">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                    
                    <label>
                        Steps:
                        <textarea name="steps" value={recipe.steps.join('\n')} onChange={handleChange} required className="border p-1 w-full" placeholder="Enter each step on a new line." />
                    </label>

                    <label>
                        Categories:
                        <div className="flex flex-row gap-3 categorydiv">
                            {['breakfast', 'lunch', 'dinner', 'veg', 'non-veg'].map((category) => (
                                <label key={category}>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        checked={recipe.categories.includes(category)}
                                        onChange={handleChange}
                                    />
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </label>
                            ))}
                        </div>
                    </label>

                    <label>
                        Image:
                        <input type="file" name="image" onChange={handleChange} className="w-full" />
                    </label>

                    <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-4">
                        Create Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;
