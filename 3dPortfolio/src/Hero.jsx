import React from 'react'
import { words } from '3dPortfolio/src/constants/index.js'
const Hero = () => {
    return (
        <section className='h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500'>
            <div className='text-center text-white'>
                <h1 className='text-5xl font-bold mb-4'>Welcome to My Portfolio</h1>
                <p className='text-xl mb-8'>Showcasing my 3D projects and skills</p>
                <button className='px-6 py-3 bg-white text-purple-500 font-semibold rounded-lg hover:bg-gray-200 transition duration-300'>View Projects</button>
            </div>

            <div className= "hero-layout">
                {/* Left Hero content*/}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className= "hero-text">
                        <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
                        <p className="text-xl mb-8">Showcasing my 3D projects and skills</p>
                        <button className="px-6 py-3 bg-white text-purple-500 font-semibold rounded-lg hover:bg-gray-200 transition duration-300">View Projects</button>
                    </div>
                </header>
            </div>
        </section>
    )
}

export default Hero