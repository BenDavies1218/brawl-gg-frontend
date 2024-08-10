import { motion } from "framer-motion"

// eslint-disable-next-line react/prop-types
export default function Slider({ images }) {
    const imagesArray = [...images, ...images];

    return <>
        <div className="h-[500PX] relative overflow-hidden flex items-center p-10 justify-center flex-col">
            <h2 className="font-extrabold text-3xl mb-8 pt-3 text-white">
                <span className="text-highlight text-3xl">COMPANIES</span> that use us...
            </h2>
            <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:bg-gradient-to-l after:h-full after:w-1/4 after:from-black after:via-transparent after:to-transparent"></div>
                <motion.div 
                    className="flex" 
                    animate = {{
                        x: ["0%", "-100%"],
                        transition: {
                            ease: "linear",
                            duration: 15,
                            repeat: Infinity,
                        }
                    }}
                >
                    {imagesArray.map((image, index) => (
                        <div key={index} className="h-full flex-shrink-0">
                            <div className="flex items-center justify-center h-[150px] my-10">
                                <img 
                                    src={image.logo} 
                                    alt={image.name}
                                    className="h-full max-w-full opacity-75 object-contain mx-5" 
                                />
                            </div>
                        </div> 
                    ))}
                </motion.div>
        </div>
    </>
}